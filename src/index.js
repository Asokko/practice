import'./scss/index.scss'
import {Excel} from 'path/components/excel/Excel'
import {Header} from 'path/components/header/Header'
import {Toolbar} from 'path/components/toolbar/Toolbar'
import {Formula} from 'path/components/formula/Formula'
import {Table} from 'path/components/table/Table'
import {createStore} from 'pathCore/createStore'
import {rootReducer} from 'path/redux/rootReducer'
import {storage, debounce} from 'pathCore/utils'
import {initialState} from 'path/redux/initialState'

const store=createStore(rootReducer, initialState)

const stateListener =debounce(state=>{
    console.log('App State:', state)
    storage('excel-state', state)
}, 300)
store.subscribe(stateListener)



const excel=new Excel('#app', {
    components:[Header, Toolbar,Formula, Table],
    store
})

excel.render()