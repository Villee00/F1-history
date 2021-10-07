/* eslint-disable react/display-name */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';


function CustomFooterStatusComponent(props) {

  return <div> { props.results.length} drivers in race</div>;
}

const columns = [
  { field: 'driver', sortable: false, width: 150,
    renderCell: ({ value }) => <Avatar src={value.pictureLink} />},
  { field: 'position', headerName: 'Finish position', width: 100 },
  { field: 'grid', headerName: 'Grid position', width: 150 },
  { field: 'driver', sortable: false, headerName: 'First name', width: 150,
    valueFormatter: ({ value }) => value.firstName + ' ' + value.lastName },

  { field: 'grid', headerName: 'Grid position', width: 150 },
];
const ResultTable = ({results}) =>{
  console.log(results);
  return(
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={results} columns={columns} getRowId={() => Math.random()}
        components={{
          Footer: CustomFooterStatusComponent
        }}
        componentsProps={{
          footer: { results }
        }}/>
    </div>
  );
};

export default ResultTable;