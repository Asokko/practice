import {ExcelComponent} from 'pathCore/ExcelComponent'
import {$} from 'pathCore/dom'
export class Formula extends ExcelComponent{
    static className='excel__formula'

    constructor($root, options){
        super($root,{
            name:'Formula',
            listeners:['input','keydown'],
            subscribe:['currentText'],
            ...options
        })
    }

    toHTML(){
        return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }
    storeChanged({currentText}){
        this.$formula.text(currentText)
    }


    onInput(event){
        this.$emit('formula: input', $(event.target).text())
    }
    init(){
        super.init()

        this.$formula=this.$root.find('#formula')
        this.$subs('table:select', $cell=>{
            this.$formula.text($cell.data.value)
        })
    }
    onKeydown(event){
        const keys=['Enter', 'Tab']
        if(keys.includes(event.key)){
            event.preventDefault()
            this.$emit('formula: done')
        }
    }
}