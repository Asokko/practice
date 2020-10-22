import {Page} from 'pathCore/Page'
import {Excel} from 'path/components/excel/Excel'
import {Header} from 'path/components/header/Header'
import {Toolbar} from 'path/components/toolbar/Toolbar'
import {Formula} from 'path/components/formula/Formula'
import {Table} from 'path/components/table/Table'
import {createStore} from 'pathCore/store/createStore'
import {rootReducer} from 'path/redux/rootReducer'
import {storage, debounce} from 'pathCore/utils'
import {normalizeInitialState } from 'path/redux/initialState'


function storageName(param){
    return 'excel:'+param
}

export class ExcelPage extends Page {
    getRoot() {
        const params=this.params?this.params: Date.now().toString()
        const state=storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = debounce(state => {
        storage(storageName(params), state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
        components: [Header, Toolbar, Formula, Table],
        store
        })

        return this.excel.getRoot()
        }

        afterRender() {
        this.excel.init()
        }

        destroy() {
        this.excel.destroy()
        }
  }