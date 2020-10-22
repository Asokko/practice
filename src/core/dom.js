class Dom{
   constructor(selector){
       this.$el=typeof selector==='string'
       ? document.querySelector(selector)
       : selector
   }
   html(html){
      
       if(typeof html==='string'){
           this.$el.innerHTML=html
           return this
       }
       return this.$el.outerHTML.trim()
   }
   clear() {
    this.html('')
    return this
  }
   
   attr(name, value){
    
    if(value){
        this.$el.setAttribute(name, value)
        return this
    }
    return this.$el.getAttribute(name)
   }

   text(text){
       if(typeof text!=='undefined'){
           this.$el.textContent=text
           return this
       }
       if(this.$el.tagName.toLowerCase()==='input'){
           return this.$el.value.trim()
       }
       return this.$el.textContent.trim()
   }

   getStyles(styles=[]){
       return styles.reduce((res, style)=>{
            res[style]=this.$el.style[style]
            return res
       },{})
   }

   on(evenType, callback){
       this.$el.addEventListener(evenType, callback)

   }

   closest(selector){
       return $(this.$el.closest(selector))
   }
   
   find(selector){
       return $(this.$el.querySelector(selector))
   }

   getCoords(){
       return this.$el.getBoundingClientRect()
   }

   get data(){
       return this.$el.dataset
   }

   findAll(selector){
       return this.$el.querySelectorAll(selector)
   }

   css(styles={}){
       Object.keys(styles).forEach(key=>{
           this.$el.style[key]=styles[key]
       })
       
   }

   addClass(className){
        this.$el.classList.add(className)
        return this
   }

   removeClass(className){
        this.$el.classList.remove(className)
        return this
   }

   id(parse){
       if(parse){
          const parsed=this.id().split(':')
            return{
                row:+parsed[0],
                col:+parsed[1]
            }
       }
       return this.data.id
   }

   focus(){
       this.$el.focus()
       return this
   }

   off(evenType, callback){
    this.$el.removeEventListener(evenType, callback)
   }
   append(node){
       if(node instanceof Dom){
           node = node.$el
       }
       if (Element.prototype.append){
           this.$el.append(node)
       }else{
           this.$el.appendChild(node)
       }
       return this
   }
}
//event.target
export function $(selector){
    return new Dom(selector)
}

$.create=(tagName, classes='')=>{
    const el=document.createElement(tagName)
     if(classes){   
        el.classList.add(classes)
     }
     return $(el)
}