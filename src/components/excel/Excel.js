import {$} from 'pathCore/dom'
export class Excel {
    constructor(selector, options){
       // this.$el=document.querySelector(selector) //<div ip="app"></div>
       this.$el=$(selector)
       this.components=options.components || []
    }

    getRoot(){
        /*const $root=document.createElement('div')
        $root.classList.add('excel')*/
        const $root=$.create('div','excel')
        this.components=this.components.map(Component => {
            const $el=$.create('div',Component.className)
            /*const $el=document.createElement('div')
            $el.classList.add(Component.className)*/
            const component=new Component($el)
            //$el.innerHTML=component.toHTML()
            $el.html(component.toHTML())
            $root.append($el)
            return component
        });
        return $root
    }

    render() {  
        this.$el.append(this.getRoot())
        //включаем слушателей
        this.components.forEach(component=>component.init())
    }
}