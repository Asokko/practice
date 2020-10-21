import {ExcelStateComponent} from 'pathCore/ExcelStateComponent'
import {createToolbar} from './toolbarTemplate'
import {defaultStyles} from 'path/constants'
import {$} from 'pathCore/dom'

export class Toolbar extends ExcelStateComponent{
    static className='excel__toolbar'
    constructor($root, options){
      super($root,{
          name:'Toolbar',
          listeners:['click'],
          subscribe:['currentStyles'],
          ...options
      })
    }
    prepare(){
      this.initState(defaultStyles)
    }

    get template(){
      return createToolbar(this.state)
    }
    toHTML(){
        return this.template
    }

    storeChanged(changes){
      this.setState(changes.currentStyles)
    }

    onClick(event){
      const $target= $(event.target)
      $target.addClass('active')
      if($target.data.type==='button'){
        const value=JSON.parse($target.data.value)
        this.$emit('toolbar: appleStyle', value)
      }
    }
}