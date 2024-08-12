import { Button, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Stack } from "@mui/material";
import FormikControl from "component/formik/FormikControl";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { gridSpacing } from "store/constant";
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const AddProductLblQty = ({ onCancel }) => {

    const initialValues = {
        productName: '',
        productArray: [
            { product: 'Chair', quantity: 2 }]
    };

    const productArray = [
        { product: 'Chair', quantity: 2 },
        { product: 'Chair', quantity: 2 }
    ];
    const onSubmit = (values) => {
        console.log('Product qty ', values);
    }

    function deleteProduct(i, values, setValues) {
        console.log('111 ', i);

        const productArray = [...values.productArray];
        productArray.splice(i, 1);
        setValues({ ...values, productArray });
    }

    function addProductDynamic(e, values, setValues, errors) {
        console.log('1212 ', values);
        console.log('12 ', setValues);
        console.log('123 ', errors);
        const productArray = [...values.productArray]
        console.log('1212 ', e)
        var newProduct = {};
        productArray.push(newProduct);
        setValues({ ...values, productArray });
    }

    return (

        <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={12} lg={12}>
                <DialogTitle>Add Quantity</DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}>
                        {({ errors, values, touched, setValues }) => (
                            <Form item my={10}>
                                <FieldArray item name="productArray">
                                    {(arrayValue) => (values.productArray?.map((val, i) => {
                                        return (
                                            // <Form my={3}>
                                                <Grid  container spacing={gridSpacing} style={{marginTop: 0}}>
                                                    <Grid item xs={6} md={5}>
                                                        <FormikControl
                                                            control='input'
                                                            name={`productArray.${i}.product`}
                                                            label='Product Name'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={5}>
                                                        <FormikControl
                                                            control='input'
                                                            name={`productArray.${i}.quantity`}
                                                            label='Product Quantity'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={2}>
                                                        <Button type="button" variant="contained" onClick={e => (deleteProduct(i, values, setValues))}>
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            // </Form>
                                        )
                                    }))}
                                </FieldArray>

                                <DialogActions sx={{ p: 3 }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Button type="button" variant="outlined" onClick={e => addProductDynamic(e, values, setValues, errors)}>
                                                    Add Item
                                                </Button>
                                                <Button type="button" variant="outlined" onClick={onCancel}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="contained">
                                                    {true ? 'Submit' : 'Update'}
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Grid>
        </Grid>
    )

}

AddProductLblQty.propTypes = {
    onCancel: PropTypes.func.isRequired,
};
 
export default AddProductLblQty;

// model header: material used
// field name: material name, quantity

{/* <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={12} lg={12}>
                <DialogTitle>Add Qty</DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}>
                        {({values, setValues, field}) => {
                            return (
                                <div>
                                <FieldArray name="productArray">
                                    {(arrayValue) => (values.productArray?.map((val, i) => {
                                        return (
                                            <Form my={5}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item xs={12} md={6}>
                                                        <FormikControl
                                                            control='input'
                                                            name={`productArray.${i}.product`}
                                                            label='Product Name'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormikControl
                                                            control='input'
                                                            name={`productArray.${i}.quantity`}
                                                            label='Product Name'
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position='start'>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        )
                                    }))}
                                </FieldArray>

                    <DialogActions sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button type="button" variant="outlined" onClick={e => addProductDynamic(e, values, setValues, field)}>
                                    Add Item
                                </Button>
                                <Button type="button" variant="outlined" onClick={onCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained">
                                    {true ? 'Submit' : 'Update'}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogActions></div>
                            )
                            
                        }}</Formik>
                </DialogContent>
            </Grid>
        </Grid> */}