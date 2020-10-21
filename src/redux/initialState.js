import {storage} from 'pathCore/utils'
import {defaultStyles, defaultTitle} from 'path/constants'

const defaultState={
    colState:{},
    title:defaultTitle,
    rowState:{},
    dataState:{},
    stylesState:{},
    currentText:'',
    currentStyles: defaultStyles
}

const normalize=state=>({
    ...state,
    currentStyles:defaultStyles,
    currentText:''
})
export const initialState=storage('excel-state')?normalize(storage('excel-state')):defaultState