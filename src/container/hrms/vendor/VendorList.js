import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { COLUMNS } from '@/utils/react-table-util/VendorColumns';
import GlobalFilterOnReactTable from '@/component/filter/GlobalFilterOnReactTable';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useTheme } from '@mui/styles';

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
  Pagination,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddTwoTone';
import AddEditVendor from './AddEditVendor';
import { getAllVendor } from '@/service/VendorService';
import { gridSpacing } from '@/store/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

// ==============================|| PRODUCT LIST ||============================== //

const VendorList = () => {
  const dispatch = useDispatch();
  const { error, add, update } = useSelector((state) => state.vendor);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalPage, setTotalPage] = useState(0);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (add) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: 'New Employee Added Successfully',
          variant: 'alert',
          alertSeverity: 'success',
        })
      );
    } else if (update) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: ' Employee updated Successfully',
          variant: 'alert',
          alertSeverity: 'success',
        })
      );
    }
  }, [dispatch, add, update]);

  const handlePageSize = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const page = event.target.value ? event.target.value : 100;
    setPageSize(page);
    loadAllVendor();
  };

  const handlePage = (event, value) => {
    setPage(value - 1);
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => vendors, [vendors]);

  const loadAllVendor = useCallback(async () => {
    await getAllVendor(page, pageSize).then((data) => {
      console.log('Data : ', data);
      if (data) {
        setVendors(data.vendorList);
        setTotalPage(data.totalPage);
      }
    });
  }, [page, pageSize]);

  useEffect(() => {
    loadAllVendor();
  }, [page, loadAllVendor]);

  const addVendorForm = () => {
    console.log('Add Vendor form route');
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const onEditVendor = (vendor) => {
    setEditFormModel(vendor);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllVendor();
    setIsModelOpen(false);
  };

  const onVendorDetail = (employee) => {
    console.log(employee);
    navigate(`/app/vendor-detail/${employee.id}`, { state: employee });
  };

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
    <MainCard title='Vendor List' content={false}>
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
                onClick={() => addVendorForm()}
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
                      <TableCell
                        {...cell.getCellProps()}
                        onClick={() => onVendorDetail(row.original)}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                  <TableCell onClick={() => onEditVendor(row.original)}>
                    <Tooltip title='Edit'>
                      <IconButton color='secondary' size='xs'>
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
              count={totalPage}
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
              <MenuItem onClick={handleClose} value='100'>
                {' '}
                100 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value='200'>
                {' '}
                200 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value='300'>
                {' '}
                300 Rows{' '}
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
          <AddEditVendor onCancel={handleModelClose} formValues={formValues} />
        )}
      </Dialog>
    </MainCard>
  );
};

export default VendorList;
