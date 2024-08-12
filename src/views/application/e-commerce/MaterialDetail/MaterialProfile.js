import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  Dialog,
} from '@mui/material';

// third-party
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

// project imports
import Chip from '@/ui-component/extended/Chip';
import Avatar from '@/ui-component/extended/Avatar';
import { ADD_PRODUCTS } from '@/store/action/actions';

// assets
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { updateMaterialStock } from '@/service/MaterialService';
import { useState } from 'react';
import AddEditMaterial from '@/container/inventory/material/AddEditMaterial';
import Consumption from './Consumption';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

const validationSchema = yup.object({
  color: yup.string().required('Color selection is required'),
  size: yup.number().required('Size selection is required.'),
});

// ==============================|| COLORS OPTION ||============================== /

const Colors = ({ checked, colorsData }) => {
  const theme = useTheme();
  return (
    <Grid item>
      <Tooltip title={colorsData[0].label}>
        <ButtonBase sx={{ borderRadius: '50%' }}>
          <Avatar
            color='inherit'
            size='badge'
            sx={{
              bgcolor: colorsData[0].bg,
              color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800',
            }}>
            {checked && (
              <CircleIcon
                sx={{
                  color:
                    theme.palette.mode === 'light' ? 'grey.50' : 'grey.800',
                  fontSize: '0.75rem',
                }}
              />
            )}
            {!checked && (
              <CircleIcon
                sx={{ color: colorsData[0].bg, fontSize: '0.75rem' }}
              />
            )}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Grid>
  );
};

Colors.propTypes = {
  checked: PropTypes.bool,
  colorsData: PropTypes.array,
};

// tabs panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const MaterialProfile = ({ material }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [quantity, setQuantity] = useState(
    material.quantity ? material.quantity : 0
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: material.id,
      name: material.name,
      image: material.materialImageLink,
      salePrice: material.pricePerUnit,
      quantity: material.quantity ? material.quantity : 0,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch({ type: ADD_PRODUCTS, material: values });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Submit Success',
        variant: 'alert',
        alertSeverity: 'success',
      });
      history('/e-commerce/checkout');
    },
  });

  const { handleSubmit } = formik;

  const updateQuantity = () => {
    updateMaterialStock(material.id, { quantity });
    dispatch(
      SNACKBAR_OPEN({
        open: true,
        message: 'Quantity Updated',
        variant: 'alert',
        alertSeverity: 'success',
      })
    );
  };

  const quantityIncrement = () => {
    return (
      <ButtonGroup
        size='large'
        variant='text'
        color='inherit'
        sx={{ border: '1px solid', borderColor: 'grey.400' }}>
        <Button
          key='three'
          disabled={quantity <= 1}
          onClick={() => setQuantity(quantity - 1)}
          sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}>
          <RemoveIcon fontSize='inherit' />
        </Button>
        <Button key='two' sx={{ pl: 0.5, pr: 0.5 }}>
          {quantity}
        </Button>
        <Button
          key='one'
          onClick={() => setQuantity(quantity + 1)}
          sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}>
          <AddIcon fontSize='inherit' />
        </Button>
      </ButtonGroup>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consumption, setConsumption] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setConsumption(false);
  };

  const handleAddProduct = (values) => {
    handleModalClose();
  };

  const edit = () => {
    setIsModalOpen(true);
  };

  const consumptionHandler = () => {
    setConsumption(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Chip
                  size='small'
                  label={material.quantity ? 'In Stock' : 'Out of Stock'}
                  chipcolor={material.quantity ? 'success' : 'error'}
                  sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Typography variant='h3'>{material.name}</Typography>
                  <Chip
                    size='small'
                    label='New'
                    chipcolor='primary'
                    variant='outlined'
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  size='small'
                  onClick={edit}>
                  edit
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            Material Name : {material.materialName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            Category : {material.category}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            Description : {material.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='h2' color='primary'>
              ₹{material.pricePerUnit}
            </Typography>
            <Typography variant='caption'>(Inclusive of all taxes)</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={10}>
                  <Table>
                    <TableBody
                      sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 'bold' }}>
                            Quantity
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          {quantityIncrement()}
                        </TableCell>
                        <TableCell>
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            size='small'
                            startIcon={<ShoppingCartTwoToneIcon />}
                            onClick={updateQuantity}>
                            Update Quantity
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <br />
          <Grid item xs={12}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              size='large'
              startIcon={<ShoppingCartTwoToneIcon />}
              onClick={consumptionHandler}>
              Consumption
            </Button>
          </Grid>
        </Grid>

        <Dialog
          fullWidth
          onClose={handleModalClose}
          open={isModalOpen}
          sx={{ '& .MuiDialog-paper': { p: 0 } }}>
          {isModalOpen && (
            <AddEditMaterial
              onCancel={handleModalClose}
              handleSubmit={handleAddProduct}
            />
          )}
        </Dialog>
        <Dialog
          fullWidth
          onClose={handleModalClose}
          open={consumption}
          sx={{ '& .MuiDialog-paper': { p: 0 } }}>
          {consumption && (
            <Consumption
              onCancel={handleModalClose}
              handleSubmit={handleAddProduct}
              materialId={material.id}
            />
          )}
        </Dialog>
      </Grid>
    </>
  );
};

MaterialProfile.propTypes = {
  material: PropTypes.object,
};

export default MaterialProfile;
