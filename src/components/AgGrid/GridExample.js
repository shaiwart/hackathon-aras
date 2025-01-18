import { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import { partData } from '../../data/partData'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function GridExample({ partData }) {
    // Enable Pagination by setting pagination to be true.
    const pagination = true;
    const paginationPageSize = 20;
    const paginationPageSizeSelector = [20, 50, 100];

    // Add buttons, checkboxes or images to cells with a Cell Component.
    const CustomButtonComponent = (props) => {
        return <button onClick={() => window.alert('clicked')}>{props.value}</button>;
    };

    // Row Selection is enabled using the rowSelection attribute.
    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow',
        };
    }, []);

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        // { make: "Ford", model: "F-Series", price: 33850, electric: false },
        // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: "classification",
            flex: 1,
            type: 'shaded',
            resizable: false,
            filter: true,
            // floatingFilter: true
        },
        {
            headerName: "Plant Location",
            field: "location",
            flex: 1,
            cellDataType: 'text', // enables cell data type `text`
            filter: true,

            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Tesla', 'Ford', 'Toyota'],
            }
        },
        {
            field: "product_area",
            flex: 1,
            filter: true,
            // cellRenderer: CustomButtonComponent,
        },
        {
            field: "state",
            flex: 1,
            filter: true,
            valueFormatter: p => '😀- ' + p.value.toLocaleString(),
        },
        {
            field: "id",
            flex: 1,
            filter: true,
        },
        {
            headerName: "Is Released",
            field: "is_released",
            filter: true,
        }
    ]);


    // Use defaultColDef to set properties across ALL Column.
    const defaultColDef = useMemo(() => {
        return {
            width: 150,
            cellStyle: { fontWeight: 'normal' },
        };
    }, []);


    // brings data to set be filled in rows
    const onGridReady = useCallback(async () => {
        // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        //   .then((resp) => resp.json())
        //   .then((data) => setRowData(data));

        setRowData(partData);



        // Now bring all the parts and update the table value 
        // earlier we fetched only 100 values to show on the table 
        const token = sessionStorage.getItem("access_token");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        const response = await fetch("http://localhost:5000/api/server/odata/Part?$select=item_number,id,classification,location,product_area,state,is_released", requestOptions);
        const result = await response.text();
        const resultJson = JSON.parse(result);
        setRowData(resultJson.value);
    }, []);



    // ...
    return (
        <div className="App">
            <div
                // define a height because the Data Grid will fill the size of the parent container
                style={{ height: 680 }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={rowSelection}
                    onGridReady={onGridReady}

                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default GridExample;
