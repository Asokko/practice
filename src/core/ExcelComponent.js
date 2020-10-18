import {DOMListener} from 'pathCore/DOMListener'

export class ExcelComponent extends DOMListener{
    constructor($root, options={}){
        super($root,options.listeners)
        this.name=options.name || ''
        this.observer=options.observer
        this.prepare()
        this.unsubscribers=[]
    }
    //Возврощает шаблон компонента
    toHTML(){
        return ''
    }
    //настройка компонента до init
    prepare(){
        
    }
    //уведомление на событие event
    $dispatch(event, ...args){
        this.observer.dispatch(event, ...args)
    }
    //подписка на собитие event
    $subs(event,fn){
        const unsubs=this.observer.subscribe(event, fn)
        this.unsubscribers.push(unsubs)
    }
    //инициализация компонента+DOM слушатели
    init(){
        this.initDOMListeners()
    }
    //удаление компонента+удаление слушателей
    destroy(){
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub=>unsub())
    }
}