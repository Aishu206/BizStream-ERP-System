import { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  Stack,
} from "@mui/material";

// assets
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import dayjs from "dayjs";
import { addConsumptionMaterial } from "@/service/MaterialConsumptionService";
import { SNACKBAR_OPEN } from "@/redux-toolkit/reducer/snackbarReducer";
import FormikControl from "@/component/formik/FormikControl";
import MainCard from "@/ui-component/cards/MainCard";
import { gridSpacing } from "@/store/constant";

// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const Consumption = ({ onCancel, handleSubmit, materialId }) => {
  const dispatch = useDispatch();
  const [materialConsumptionList, setMaterialConsumptionList] = useState([]);

  let initialValues = {
    productName: "",
    clientName: "",
    date: dayjs(Date.now()),
    paidBy: "",
    quantity: "",
    materialId: materialId,
  };

  const validationSchema = Yup.object({
    clientName: Yup.string().required("Client name is required"),
    paidBy: Yup.string().required("Paid by field is required"),
    orderBy: Yup.string().required("Order by field is required"),
  });

  const onSubmit = (values) => {
    console.log("Values ===>  ", {
      ...values,
    });

    addConsumptionMaterial({ ...values }).then((data) =>
      setMaterialConsumptionList(data)
    );

    dispatch(
      SNACKBAR_OPEN({
        open: true,
        message: "Material Added Successfully",
        variant: "alert",
        alertSeverity: "success",
      })
    );
    handleSubmit(values);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard title={true ? "Add Consumption" : "Edit Consumption"}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Form autoComplete="off" my={5}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          name="productName"
                          label="product Name"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ChairOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          name="clientName"
                          label="Client Name"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ChairOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          name="orderBy"
                          label="Order By"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ChairOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          name="paidBy"
                          label="Paid By"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ChairOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          name="quantity"
                          label="Quantity"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AspectRatioOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="date"
                          name="date"
                          label="Order Date"
                        />
                      </Grid>

                      <DialogActions sx={{ p: 3 }}>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Button
                                type="button"
                                variant="outlined"
                                onClick={onCancel}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" variant="contained">
                                Submit
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </MainCard>
        </DialogContent>
      </Grid>
    </Grid>
  );
};

Consumption.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  materialId: PropTypes.string.isRequired,
};

export default Consumption;
