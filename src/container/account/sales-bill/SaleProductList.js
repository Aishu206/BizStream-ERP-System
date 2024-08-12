import { useState, useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { COLUMNS } from '@/utils/react-table-util/ProductSaleColumns';
import GlobalFilterOnReactTable from '@/component/filter/GlobalFilterOnReactTable';

// material-ui
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
  Dialog,
  MenuItem,
  Menu,
  Button,
  Pagination,
} from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { useTheme } from '@mui/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { gridSpacing } from '@/store/constant';
import AddEditSaleProduct from './AddEditSaleProduct';
import { getAllPurchasingProduct } from '@/service/PurchasingService';

// ==============================|| PRODUCT LIST ||============================== //

const SaleProductList = () => {
  const [saleList, setSaleList] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePageSize = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setPageSize(event.target.value);
    loadAllSaleProduct();
  };

  const handlePage = (event, value) => {
    setPage(value - 1);
  };

  const loadAllSaleProduct = async () => {
    await getAllPurchasingProduct().then((data) => {
      if (data) {
        setSaleList(data);
      }
    });
  };

  useEffect(() => {
    loadAllSaleProduct();
  }, [page]);

  const onSale = () => {
    console.log('Add Product to Sale form route');
    setIsModelOpen(true);
  };

  const onEditExpense = (expense) => {
    setEditFormModel(expense);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllSaleProduct();
    setIsModelOpen(false);
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => saleList, [saleList]);

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
    <MainCard title='Product Sale List' content={false}>
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
            <Tooltip title='Add Expense'>
              <Fab
                onClick={() => onSale()}
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
                <TableCell>Edit</TableCell>
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
                  <TableCell onClick={() => onEditExpense(row.original)}>
                    <Tooltip title='Edit'>
                      <IconButton color='secondary' size='large'>
                        <EditIcon sx={{ fontSize: '1.3rem' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent='space-between' spacing={gridSpacing}>
          <Grid item>
            <Pagination
              count={0}
              page={page + 1}
              color='primary'
              onChange={handlePage}
            />
          </Grid>
          <Grid item>
            <Button
              size='large'
              sx={{ color: theme.palette.grey[900] }}
              color='secondary'
              endIcon={<ExpandMoreRoundedIcon />}
              onClick={handlePageSize}>
              {pageSize} Rows
            </Button>
            <Menu
              id='menu-user-list-style1'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant='selectedMenu'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}>
              <MenuItem onClick={handleClose} value='10'>
                {' '}
                10 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value='20'>
                {' '}
                20 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value='30'>
                {' '}
                30 Rows{' '}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isModelOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isModelOpen && (
          <AddEditSaleProduct
            onCancel={handleModelClose}
            formValues={formValues}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default SaleProductList;
