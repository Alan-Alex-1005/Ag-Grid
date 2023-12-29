// Inside DataGridComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'idproperty1', headerName: 'ID Property', width: 150, editable: true },
  { field: 'GrpName', headerName: 'Group Name', width: 150, editable: true },
  { field: 'Reg_No', headerName: 'Registration No', width: 150, editable: true },
  { field: 'TRN', headerName: 'TRN', width: 120, editable: true },
  { field: 'Acct_No', headerName: 'Account No', width: 150, editable: true },
  { field: 'CustID1', headerName: 'Customer ID 1', width: 150, editable: true },
  { field: 'CustID2', headerName: 'Customer ID 2', width: 150, editable: true },
  { field: 'CustID3', headerName: 'Customer ID 3', width: 150, editable: true },
  { field: 'CustID4', headerName: 'Customer ID 4', width: 150, editable: true },
  { field: 'CustID5', headerName: 'Customer ID 5', width: 150, editable: true },

];

const DataGridComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [newRow, setNewRow] = useState({
    idproperty1:'',
    GrpName: '',
    Reg_No: '',
    TRN: '',
    Acct_No: '',
    CustID1: '',
    CustID2: '',
    CustID3: '',
    CustID4: '',
    CustID5: '',

  });

  useEffect(() => {
    // Fetch data from the server
    axios.post('http://localhost:3001/saveData', { rows: [] }) // Sending an empty array to get the initial data
      .then((response) => setRowData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddRow = () => {
    // Add a new row to the local state with a temporary id
    const newRowWithId = { ...newRow, id: `temp-${Date.now()}` };
    setRowData((prevRows) => [...prevRows, newRowWithId]);

    // Clear the input fields
    setNewRow({
      idproperty1:'',
      GrpName: '',
      Reg_No: '',
      TRN: '',
      Acct_No: '',
      CustID1: '',
      CustID2: '',
      CustID3: '',
      CustID4: '',
      CustID5: '',

    });
  };

  const handleSaveAllData = () => {
    // Save all rows to the server
    axios.post('http://localhost:3001/saveData', { rows: rowData })
      .then((response) => console.log('Data saved successfully:', response.data))
      .catch((error) => console.error('Error saving data:', error));
  };

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={{ editable: true, resizable: true }}
          domLayout='autoHeight'
          onGridReady={onGridReady}
        />
      </div>
      <div>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleSaveAllData}>Save All Data</button>
      </div>
    </div>
  );
};

export default DataGridComponent;
