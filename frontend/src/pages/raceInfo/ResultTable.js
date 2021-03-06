import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { buildPictureURL } from '../../utils/PictureChanger';

function CustomFooterStatusComponent(props) {
  return <div> {props.results.length} drivers in race</div>;
}

const useStyles = makeStyles({
  root: {
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      backgroundColor: '#d47483',
      fontWeight: '600',
    },
  },
});

const columns = [
  {
    field: 'picture',
    headerName: '',
    sortable: false,
    width: 50,
    renderCell: function Picture({ value }) {
      return <Avatar src={value} />;
    },
  },
  {
    field: 'driver',
    sortable: false,
    headerName: 'Name',
    flex: 1,
    type: 'text',
    valueFormatter: ({ value }) => value.firstName + ' ' + value.lastName,
    renderCell: function Driver({ value }) {
      return (
        <Link to={`/drivers/${value.id}`}>
          <Typography color="primary">
            {value.firstName} {value.lastName}
          </Typography>
        </Link>
      );
    },
  },
  {
    field: 'position',
    headerName: 'Finish position',
    flex: 0.5,
    type: 'number',
  },
  { field: 'grid', headerName: 'Grid position', flex: 0.5, type: 'number' },
  {
    field: 'positionsGained',
    headerName: 'Gained positions',
    flex: 0.5,
    type: 'number',
    cellClassName: ({ value }) =>
      clsx('super-app', {
        negative: value > 0,
        positive: value < 0,
      }),
  },
];

const ResultTable = ({ results }) => {
  const classes = useStyles();

  const data = results.map((result) => {
    const picture = buildPictureURL(result.driver.picture.link, 50);
    return { ...result, picture };
  });

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={() => Math.random()}
        components={{
          Footer: CustomFooterStatusComponent,
        }}
        componentsProps={{
          footer: { results },
        }}
        className={classes.root}
      />
    </div>
  );
};

export default ResultTable;
