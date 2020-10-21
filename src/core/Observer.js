export class Observer{
    constructor (){
        this.listeners={}
    }
    //Уведомляю слушателей если они есть
    emit(event, ...args){
        if(!Array.isArray(this.listeners[event])){
            return false
        }else{
        this.listeners[event].forEach(listener=>{
            listener(...args)
        })
        return true
    }
    }
    //добавляю нового слушателя
    subscribe(event, fn){
        this.listeners[event]=this.listeners[event]||[]
        this.listeners[event].push(fn)
        return ()=>{
            this.listeners[event]=this.listeners[event].filter(listener=>listener!==fn)
        }
    }
}