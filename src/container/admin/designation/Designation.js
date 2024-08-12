import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

// material-ui
import { Dialog } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import { DesignationColumn } from '@/utils/react-table-util/Category_Columns';
import {
  addDesignation,
  deleteDesignation,
  getAllDesignation,
  updateDesignation,
} from '@/service/AdminService';
import AddEditCategory from '@/component/common/addEditCategory';
import Notification from '@/component/common/Notification';
import CommonAdminReturnComponent from '@/component/common/commonAdminReturnComponent';

// ==============================|| PRODUCT LIST ||============================== //

const Designation = () => {
  console.log('designation');
  const [designation, setDesignation] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [onAlertOpen, setOnAlertOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  // transfering value to notification
  const [deleteFuncArgue, setDeleteFuncArgue] = useState([]);

  const columns = useMemo(() => DesignationColumn, []);

  const data = useMemo(() => designation, [designation]);

  const loadAllDesignation = useCallback(async () => {
    await getAllDesignation().then((data) => {
      if (data) {
        console.log('Category List ', data);
        setDesignation(data);
      }
    });
  }, []);

  useEffect(() => {
    loadAllDesignation();
  }, [loadAllDesignation]);

  const addDesignationForm = () => {
    console.log('Add Product Category form route');
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllDesignation();
    setIsModelOpen(false);
  };

  const onEditDesignation = (category) => {
    console.log('On Edit Product ', category);
    setEditFormModel(category);
    setIsModelOpen(true);
  };

  const onAlertHandler = (value) => {
    console.log('On Delete Product ', value);

    setDeleteFuncArgue(value);
    setOnAlertOpen(true);
  };

  const onAlertClose = () => {
    setOnAlertOpen(false);
    loadAllDesignation();
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
    <MainCard title='Designation' content={false}>
      <CommonAdminReturnComponent
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        addForm={addDesignationForm}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
        onEdit={onEditDesignation}
        onDelete={onAlertHandler}
      />

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isModelOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isModelOpen && (
          <AddEditCategory
            onCancel={handleModelClose}
            formValues={formValues}
            serviceFunctionAdd={addDesignation}
            serviceFunctionUpdate={updateDesignation}
            label='Enter Designation'
            inputName='designation'
          />
        )}
      </Dialog>

      <Dialog
        fullWidth
        onClose={onAlertClose}
        open={onAlertOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {onAlertOpen && (
          <Notification
            action='Delete'
            onCancel={onAlertClose}
            serviceFunction={deleteDesignation}
            values={deleteFuncArgue}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default Designation;
