import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { COLUMNS } from '@/utils/react-table-util/ClientColumns';

// material-ui
import { Dialog } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

// assets

import AddEditClient from './AddEditClient';
import { getAllClient } from '@/service/ClientService';
import { useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

// redux toolkit
import { useSelector, useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import RenderTable from '@/component/table/RenderTable';
import RenderTableSearchBox from '@/component/table/RenderTableSearchBox';
import RenderTablePaginationBox from '@/component/table/RenderTablePaginationBox';

// ==============================|| PRODUCT LIST ||============================== //

const ClientList = () => {
  const { add, update } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalPage, setTotalPage] = useState(0);

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

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => clients, [clients]);

  const loadAllClients = useCallback(() => {
    getAllClient(page, pageSize).then((data) => {
      if (data) {
        console.log('Client List ', data);
        setClients(data.clientList);
        setTotalPage(data.totalPage);
      }
    });
  }, [page, pageSize]);

  useEffect(() => {
    loadAllClients();
  }, [page, loadAllClients]);

  const handlePageSize = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const page = event.target.value ? event.target.value : 100;
    setPageSize(page);
    loadAllClients();
  };

  const handlePage = (event, value) => {
    setPage(value - 1);
  };

  const addClientForm = () => {
    console.log('Add Client form route');
    setEditFormModel(false);
    setIsModelOpen(true);
  };
  const handleModelClose = () => {
    loadAllClients();
    setIsModelOpen(false);
  };

  const onEditClient = (client) => {
    console.log('On Edit Client ', client);
    setEditFormModel(client);
    setIsModelOpen(true);
  };

  const onClientDetail = (employee) => {
    console.log(employee);
    navigate(`/app/client-detail/${employee.id}`, { state: employee });
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
    <MainCard title='Client List' content={false}>
      {/* searchBox */}
      <RenderTableSearchBox
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        addForm={addClientForm}
        title={'Add Client'}
      />

      {/* table */}
      <RenderTable
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
        onModuleDetail={onClientDetail}
        onEditModule={onEditClient}
      />

      {/* Pageination BOX */}
      <RenderTablePaginationBox
        theme={theme}
        anchorEl={anchorEl}
        totalPage={totalPage}
        page={page}
        pageSize={pageSize}
        handlePage={handlePage}
        handlePageSize={handlePageSize}
        handleClose={handleClose}
      />

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isModelOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isModelOpen && (
          <AddEditClient onCancel={handleModelClose} formValues={formValues} />
        )}
      </Dialog>
    </MainCard>
  );
};

export default ClientList;
