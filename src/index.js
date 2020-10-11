import'./scss/index.scss'
import {Excel} from 'path/components/excel/Excel'
import {Header} from 'path/components/header/Header'
import { Toolbar } from 'path/components/toolbar/Toolbar'
import { Formula } from 'path/components/formula/Formula'
import { Table } from 'path/components/table/Table'

const excel=new Excel('#app', {
    components:[Header, Toolbar,Formula, Table]
})

excel.render()