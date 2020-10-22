import {DOMListener} from 'pathCore/DOMListener'

export class ExcelComponent extends DOMListener{
    constructor($root, options={}){
        super($root,options.listeners)
        this.name=options.name || ''
        this.observer=options.observer
        this.subscribe=options.subscribe||[]
        this.store=options.store
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
    $dispatch(action){
        this.store.dispatch(action)
    }
    

    //уведомление на событие event
    $emit(event, ...args){
        this.observer.emit(event, ...args)
    }

    //изменение полей на которых подписались
    storeChanged(){

    }
    
    isWatching(key){
        return this.subscribe.includes(key)
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
    destroy() {
       
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
      }
}