import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { CategoryColumn } from '@/utils/react-table-util/Category_Columns';

// material-ui
import { Dialog } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

import {
  getAllProductCategory,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from '@/service/AdminService';
import CommonAdminReturnComponent from '@/component/common/commonAdminReturnComponent';
import AddEditCategory from '@/component/common/addEditCategory';
import Notification from '@/component/common/Notification';

// ==============================|| PRODUCT LIST ||============================== //

const ProductCategory = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);
  const [onAlertOpen, setOnAlertOpen] = useState(false);

  // transfering value to notification
  const [deleteFuncArgue, setDeleteFuncArgue] = useState([]);

  const columns = useMemo(() => CategoryColumn, []);
  const data = useMemo(() => productCategory, [productCategory]);

  const loadAllProductCategory = useCallback(async () => {
    await getAllProductCategory().then((data) => {
      if (data) {
        console.log('Category List ', data);
        setProductCategory(data);
      }
    });
  }, []);

  useEffect(() => {
    loadAllProductCategory();
  }, [loadAllProductCategory]);

  const addProductCategoryForm = () => {
    console.log('Add Product Category form route');
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllProductCategory();
    setIsModelOpen(false);
  };

  const onEditProductCategory = (category) => {
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
    loadAllProductCategory();
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
    <MainCard title='Product Category' content={false}>
      <CommonAdminReturnComponent
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        addForm={addProductCategoryForm}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
        onEdit={onEditProductCategory}
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
            serviceFunctionAdd={addProductCategory}
            serviceFunctionUpdate={updateProductCategory}
            label='Product Category'
            inputName='name'
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
            serviceFunction={deleteProductCategory}
            values={deleteFuncArgue}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default ProductCategory;
