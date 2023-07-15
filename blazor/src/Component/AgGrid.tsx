import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ValueFormatterFunc } from 'ag-grid-community';

interface ColDefs {
    field: string
    headerName?: string
    filter?: any
    cellRenderer?: React.ReactNode
}

export interface ColumnDefs<D> {
    field?: keyof D
    headerName?: string
    filter?: any
    cellRenderer?: React.ReactNode
    pinned?: string | boolean | null
    type?: string | string[]
    valueFormatter?: string | ValueFormatterFunc
    suppressNavigable?: boolean
    cellRendererParams?: any
    hide?: boolean
    suppressToolPanel?: boolean
    
}

export interface DefaultColDef {
    editable: boolean
    enableRowGroup: boolean
    enablePivot: boolean
    enableValue: boolean
    flex: number
    minWidth: number
    resizable: boolean
    floatingFilter: boolean
    sortable: boolean
    filter: any
    
}

interface Props<D> {
    rowData?: D[]|undefined
    columnDefs?: ColumnDefs<D>[]
    onRowClicked?: (rowData: D) => void
    onRowDoubleClicked?: (rowData: D) => void
    floatingFilter?: boolean
    sideBar?: boolean
    height?: string | number
    globalSearchTerm?: string
}

const AgGrid = <D extends {}>({ height = 500, ...props }: Props<D>) => {
    
    
    const defaultColDef: DefaultColDef = useMemo(() => {
        return {
            editable: false,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            flex: 1,
            minWidth: 100,
            
            resizable: true,
            floatingFilter: props.floatingFilter ? props.floatingFilter : false,
            sortable: true,
            filter: 'agTextColumnFilter'
        }
    }, [props.floatingFilter])

    return (        
        <div className="ag-theme-alpine " style={{height:"100%", width: "100%"}}>
            <AgGridReact
                rowData={props.rowData}
                columnDefs={props.columnDefs as ColDef []}
                pagination={true}
                paginationPageSize={10}
                // autoGroupColumnDef={autoGroupColumnDef}
                defaultColDef={defaultColDef}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                rowSelection={'multiple'}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                
                >

            </AgGridReact>
        </div>
    );
};

export default AgGrid;
