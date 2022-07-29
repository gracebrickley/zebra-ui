import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';



const columns = [
    { field: 'type', headerName: 'Resource Type', width: 150, editable: true, },
    { field: 'fault', headerName: 'Fault State', width: 150, editable: true, 
        valueGetter: (params) => params.row.status.fault, 
    },
    { field: 'state', headerName: 'Status', width: 150, editable: true, 
        valueGetter: (params) => params.row.status.state,
        renderCell: (params) => {
            if (params.value === 'active') {
                return <span style={{ color: 'green' }}>{params.value} </span>;
            } else if (params.value === 'inactive') {
                return <span style={{ color: 'red' }}>{params.value}</span>;
            } else {
                return <span>{params.value}</span>;
            }
        }
    },
    { field: 'createdTime', headerName: 'Time Created', width: 150, editable: true, 
        valueGetter: (params) => params.row.status.createdTime,    
    },
    { field: 'lease', headerName: 'Lease Availability', width: 150, editable: true,
        valueGetter: (params) => params.row.status.lease,
    },
];

export default function ResourceDatagrid() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(null);

    const deleteRow = React.useCallback(async (params) => {
        const { rowData } = params;
        const { id } = rowData;
        const url = `http://localhost:8080/api/v1/resources/${id}`;
        const response = await axios.delete(url);
        if (response.status === 200) {
            const newData = data.filter(row => row.id !== id);
            setData(newData);
        }
    }
        , [data]);

    const toggleStatus = React.useCallback(async (params) => {
        const { rowData } = params;
        const { id } = rowData;
        const url = `http://localhost:8080/api/v1/resources/${id}/status`;
        const response = await axios.put(url);
        if (response.status === 200) {
            const newData = data.map(row => {
                if (row.id === id) {
                    row.status.state = row.status.state === 'active' ? 'inactive' : 'active';
                }
                return row;
            }
            );
            setData(newData);
        }
    }
        , [data]);
    
    const createRow = React.useCallback(async (params) => {
        const { rowData } = params;
        const { id } = rowData;
        const url = `http://localhost:8080/api/v1/resources/${id}/status`;
        const response = await axios.put(url);
        if (response.status === 200) {
            const newRow = {
                id: response.data.id,
                type: response.data.type,
                status: {
                    state: response.data.status.state,
                    fault: response.data.status.fault,
                    createdTime: response.data.status.createdTime,
                    lease: response.data.status.lease,
                }
            };
            const newData = [...data, newRow];
            setData(newData);
        }
    }
        , [data]);

    const updateRow = React.useCallback(async (params) => {
        const { rowData } = params;
        const { id } = rowData;
        const url = `http://localhost:8080/api/v1/resources/${id}`;
        const response = await axios.put(url);
        if (response.status === 200) {
            const newData = data.map(row => {
                if (row.id === id) {
                    row.type = response.data.type;
                    row.status.state = response.data.status.state;
                    row.status.fault = response.data.status.fault;
                    row.status.createdTime = response.data.status.createdTime;
                    row.status.lease = response.data.status.lease;
                }
                return row;
            }
            );
            setData(newData);
        }
    }
        , [data]);


    const getData = async () => {
        try {
            const data = await axios.get(
                'http://localhost:9999/api/v1/resources'
            );
            setData(data.data.Datacenter);
            console.log(data.data.Datacenter[0].status);
            }
        catch (e) {
            setError(e);
            setLoading(false);
        }
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        getData();
    }
    , []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={ data }
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}