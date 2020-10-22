import {clone} from 'pathCore/utils'
import {defaultStyles, defaultTitle} from 'path/constants'

const defaultState={
    colState:{},
    title:defaultTitle,
    rowState:{},
    dataState:{},
    stylesState:{},
    currentText:'',
    currentStyles: defaultStyles,
    openedData: new Date().toJSON()
}

const normalize=state=>({
    ...state,
    currentStyles:defaultStyles,
    currentText:''
})


export function normalizeInitialState(state){
    return state? normalize(state): clone(defaultState)
}