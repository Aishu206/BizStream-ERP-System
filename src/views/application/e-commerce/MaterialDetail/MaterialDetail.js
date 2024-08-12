import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material-ui
import { Box, Grid } from '@mui/material';

// project imports
import { gridSpacing } from '@/store/constant';
import { getMaterialById } from '@/service/MaterialService';
import MaterialInfo from './MaterialInfo';

import { useDispatch } from 'react-redux';
import { Product_Edit } from '@/redux-toolkit/reducer/editProductReducer';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const MaterialDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  const getMaterial = async () => {
    const data = await getMaterialById(id);
    console.log('Material Data :  ', data);
    dispatch(Product_Edit(data));
    setMaterial(data);
  };

  useEffect(() => {
    getMaterial();
  }, []);

  return (
    <Grid item xs={12} lg={12}>
      {material && (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <MaterialInfo material={material} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default MaterialDetail;
