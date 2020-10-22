import {$} from 'pathCore/dom'
import {Observer} from 'pathCore/Observer'
import {StoreSubscriber} from 'pathCore/storeSubscriber'
import {updateDate} from 'path/redux/actions'
import {preventDefault} from 'pathCore/utils'

export class Excel {
    constructor(options){
      
       this.components=options.components || []
       this.store=options.store
       this.observer=new Observer()
       this.subscriber=new StoreSubscriber(this.store)
    }

    getRoot(){
        const $root=$.create('div','excel')

        const componentOptions={
            observer:this.observer,
            store: this.store
        }

        this.components=this.components.map(Component => {
            const $el=$.create('div',Component.className)
            const component=new Component($el,componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        });
        return $root
    }

    init() {  
        if(process.env.NODE_ENV==='production'){
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component=>component.init())
    }

    destroy(){
        this.subscriber.unsubscribeFromStore(this.components)
        this.components.forEach(component=>component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}