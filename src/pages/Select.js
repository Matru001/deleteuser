import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { handleSearchData, handleDeleteData } from '../redux/dataReduer';

const columns = [
  { field: 'id', headerName: 'ID', width: 170 },
  { field: 'UserId', headerName: 'UserId', width: 280 },
  { field: 'UserName', headerName: 'UserName', width: 280 },
  { field: 'EmailId', headerName: 'EmailId', width: 280 },
  { field: 'Language', headerName: 'Language', width: 80 },
];

const Select = () => {
  const dispatch = useDispatch();

  // * Geting data from redux * //
  const { data } = useSelector((state) => state.managerDateReducer);

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDataFetch = async () => {
    dispatch(handleSearchData(searchText));
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleDeleteRows = () => {
    dispatch(handleDeleteData(...selectedRows));
  };

  const rows = data.map((item) => ({
    id: item._id,
    UserId: item.userid,
    UserName: item.username,
    EmailId: item.emailid,
    Language: item.baseline[0]?.language,
  }));

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '100px',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Fellow"
          value={searchText}
          onChange={handleSearch}
          variant="outlined"
          style={{ width: 600 }}
        />
        <Button
          variant="contained"
          onClick={handleDataFetch}
          style={{ width: 250, height: 40, marginTop: 5, marginLeft: 20 }}
        >
          Filter
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          pageSizeOptions={[10]}
          checkboxSelection
        />
        {selectedRows.length > 0 && (
          <Button
            variant="contained"
            onClick={handleDeleteRows}
            style={{ width: 250, height: 40, marginTop: 20, marginLeft: 20 }}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  );
};

export default Select;
