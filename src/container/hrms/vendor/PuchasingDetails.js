import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

import { COLUMNS } from '@/utils/react-table-util/PurchasingProductColumns';
import GlobalFilterOnReactTable from '@/component/filter/GlobalFilterOnReactTable';

// material-ui
import {
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

// project imports
import MainCard from '@/ui-component/cards/MainCard';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import { getAllSalary } from '@/service/SalaryService';

// redux-toolkit
import { useSelector, useDispatch } from 'react-redux';

// ==============================|| Salary LIST ||============================== //

const PuchasingDetails = ({ empId }) => {
  const vendorState = useSelector((state) => state.vendor);
  const dispatch = useDispatch();

  const [salary, setSalary] = useState([]);

  const loadAllSalary = useCallback(async () => {
    await getAllSalary(empId).then((data) => {
      if (data) {
        setSalary(data);
      }
    });

    // dispatch(vendorPurchasingDetailsAction(empId))
  }, [empId]);

  useEffect(() => {
    loadAllSalary();
  }, [loadAllSalary]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => salary, [salary]);
  // const data = useMemo(() => vendorState.salary, [vendorState]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return '';
        }),
      },
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <MainCard title='Purchasing Details'>
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
          </Grid>
        </Grid>
      </CardContent>

      {/* table */}

      <TableContainer>
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
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default PuchasingDetails;
