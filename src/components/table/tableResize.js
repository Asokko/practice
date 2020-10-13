import {$} from 'pathCore/dom'

export function resizeHeadler($root, event){
    const $target=$(event.target)
    //const $parent=$target.$el.parentNode
    //const $parent=$target.$el.closest('.column')
    const $parent=$target.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type=$target.data.resize

    let value
    const cssProp=type==='col'?'bottom':'right'
    $target.css({
        opacity:1,
        [cssProp]:'-5000px'
    })

    document.onmousemove=e=>{
        if(type==='col'){
            const delta=e.pageX - coords.right
            value=coords.width+delta
            $target.css({right: -delta +'px'})
        }else{
            const delta=e.pageY - coords.bottom
            value=coords.height+delta
            $target.css({bottom: -delta +'px'})
        }
    }

    document.onmouseup=()=>{
        document.onmousemove=null
        document.onmouseup=null
        if(type=='col'){
            $parent.css({width: value +'px'})
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el=>{el.style.width=value+'px'})
        }else{
            $parent.css({height: value +'px'})
        }
        $target.css({
            opacity:0,
            bottom:0,
            right:0
        })
    }

} 