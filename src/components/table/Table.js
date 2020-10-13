import {ExcelComponent} from 'pathCore/ExcelComponent'
import {createTable} from './tableTemplate'
import {resizeHeadler} from './tableResize'
import {shouldResize} from './tableFunctions'
export class Table extends ExcelComponent{
    static className='excel__table'
    constructor($root){
        super($root,{
           listeners:['mousedown']
        })
    }
    toHTML(){
        return createTable()
    }

    onMousedown(event){
       if(shouldResize(event)){
           resizeHeadler(this.$root, event)
       }
    }
}