import {ExcelComponent} from 'pathCore/ExcelComponent'
import {$} from 'pathCore/dom'
import {createTable} from './tableTemplate'
import {resizeHeadler} from './tableResize'
import {shouldResize, isCell, matrix, nextSelector} from './tableFunctions'
import {TableSelection} from './TableSelection'
import *as actions from 'path/redux/actions'
import {defaultStyles} from 'path/constants'
import {parse} from 'pathCore/parse'

export class Table extends ExcelComponent{
    static className='excel__table'
    constructor($root, options){
        super($root,{
            name:"Table",
            listeners:['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML(){
        return createTable(20, this.store.getState())
    }
    
    prepare(){
        this.selection=new TableSelection()
    }

    init(){
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$subs('formula: input', value=>{
            this.selection.current.attr('data-value', value)
            this.selection.current.text(parse(value))
            this.updateTextInStore(value)
        })

        this.$subs('formula: done', ()=>{
            this.selection.current.focus()
        })
        this.$subs('toolbar: appleStyle', (value)=>{
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids:this.selection.selectedIds
            }))
        })
        
    }
    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles=$cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event){
       try{
        const data= await resizeHeadler(this.$root, event)
        this.$dispatch(actions.tableResize(data))
        
       }
       catch(e){
            console.warn('resize error', e.message)
       }
    }

    onMousedown(event){
       if(shouldResize(event)){
          this.resizeTable(event)
       }else if(isCell(event)){
           const $target = $(event.target)
           if(event.shiftKey){
   
               const $cells=matrix($target, this.selection.current).map(id=>this.$root.find(`[data-id="${id}"]`))
               this.selection.selectGroup($cells)
           }else{
                //this.selection.select($target)
                this.selectCell($target)
           }
       }
    }

    onKeydown(event){
        const keys=['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']
        
        const {key}=event
        
        if (keys.includes(key)&& !event.shiftKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next=this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }

    }

    updateTextInStore(value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event){
        //this.$emit('table:input', $(event.target))
       this.updateTextInStore($(event.target).text())
    }

}

