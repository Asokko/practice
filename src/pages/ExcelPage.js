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

class stateProcessor{
    constructor(client, delay=300){
        this.client=client
        this.listen=debounce(this.listen.bind(this), delay)
    }
    listen(state){
        this.client.save(state)
    }
    get(){
        return this.client.get()
    }
}

class LocalStorageClient {
    constructor(name){
        this.name=storageName(name)
    }

    save(state){
        storage(this.name, state)
        return Promise.resolve()
    }

    get(){
        //return Promise.resolve(storage(this.name))
        return new Promise(resolve =>{
            const state = storage(this.name)
            setTimeout(()=>{
                resolve(state)
            }, 2000)
        })
    }
}

export class ExcelPage extends Page {

    constructor(param){
        super(param)
            this.storeSub=null
            this.processor=new stateProcessor(
                new LocalStorageClient(this.params)
            )
        
    }
    async getRoot() {
        const state= await this.processor.get()
        const store = createStore(rootReducer, normalizeInitialState(state))

        this.storeSub=store.subscribe(this.processor.listen)

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
        this.storeSub.unsubscribe()
        }
  }