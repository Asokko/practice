import {DOMListener} from 'pathCore/DOMListener'

export class ExcelComponent extends DOMListener{
    constructor($root, options={}){
        super($root,options.listeners)
        this.name=options.name || ''
    }
    //Возврощает шаблон компонента
    toHTML(){
        return ''
    }

    init(){
        this.initDOMListeners()
    }

    destroy(){
        this.removeDOMListeners()
    }
}