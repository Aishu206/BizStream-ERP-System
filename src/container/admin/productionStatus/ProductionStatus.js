import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { ProductionStatusColumn } from '@/utils/react-table-util/Category_Columns';

// material-ui
import { Dialog } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

import {
  getAllProductionStatus,
  addProductionStatus,
  updateProductionStatus,
  deleteProductionStatus,
} from '@/service/AdminService';
import CommonAdminReturnComponent from '@/component/common/commonAdminReturnComponent';
import AddEditCategory from '@/component/common/addEditCategory';
import Notification from '@/component/common/Notification';

// ==============================|| PRODUCT LIST ||============================== //

const ProductionStatus = () => {
  const [productionStatus, setProductionStatus] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);
  const [onAlertOpen, setOnAlertOpen] = useState(false);

  // transfering value to notification
  const [deleteFuncArgue, setDeleteFuncArgue] = useState([]);

  const columns = useMemo(() => ProductionStatusColumn, []);
  const data = useMemo(() => productionStatus, [productionStatus]);

  const loadAllProductionStatus = useCallback(async () => {
    await getAllProductionStatus().then((data) => {
      if (data) {
        setProductionStatus(data);
      }
    });
  }, []);

  useEffect(() => {
    loadAllProductionStatus();
  }, [loadAllProductionStatus]);

  const addProductionStatusForm = () => {
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllProductionStatus();
    setIsModelOpen(false);
  };

  const onEditProductionStatus = (category) => {
    console.log('On Edit Product ', category);
    setEditFormModel(category);
    setIsModelOpen(true);
  };

  const onAlertHandler = (value) => {
    setDeleteFuncArgue(value);
    setOnAlertOpen(true);
  };

  const onAlertClose = () => {
    setOnAlertOpen(false);
    loadAllProductionStatus();
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
    <MainCard title='Production Stages' content={false}>
      <CommonAdminReturnComponent
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        addForm={addProductionStatusForm}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
        onEdit={onEditProductionStatus}
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
            serviceFunctionAdd={addProductionStatus}
            serviceFunctionUpdate={updateProductionStatus}
            label='Stage'
            inputName='stage'
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
            serviceFunction={deleteProductionStatus}
            values={deleteFuncArgue}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default ProductionStatus;
