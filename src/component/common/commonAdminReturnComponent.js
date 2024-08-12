import React from 'react';

import {
  Fab,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import GlobalFilterOnReactTable from '@/component/filter/GlobalFilterOnReactTable';

import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddTwoTone';

const CommonAdminReturnComponent = ({
  globalFilter,
  setGlobalFilter,
  addForm,
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <CardContent>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          spacing={2}>
          <Grid item xs={12} sm={6}>
            <GlobalFilterOnReactTable
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title='Copy'>
              <IconButton size='large'>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Print'>
              <IconButton size='large'>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Filter'>
              <IconButton size='large'>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Add Client'>
              <Fab
                onClick={() => addForm()}
                color='primary'
                size='small'
                sx={{
                  boxShadow: 'none',
                  ml: 1,
                  width: 32,
                  height: 32,
                  minHeight: 32,
                }}>
                <AddIcon fontSize='small' />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>

      {/* table */}
      <TableContainer style={{ marginLeft: '20px' }}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby='tableTitle'
          {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                className='bg-primary'>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{ width: 400 }}>
                    {column.render('Header')}
                  </TableCell>
                ))}
                <TableCell style={{ width: 50 }}>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                  <TableCell onClick={() => onEdit(row.original)}>
                    <Tooltip title='Edit'>
                      <IconButton color='primary' size='xs'>
                        <EditIcon sx={{ fontSize: '1.3rem', ml: -1 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell onClick={() => onDelete(row.original)}>
                    <Tooltip title='Delete'>
                      <IconButton color='dark' size='xs'>
                        <DeleteIcon sx={{ fontSize: '1.3rem' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CommonAdminReturnComponent;
