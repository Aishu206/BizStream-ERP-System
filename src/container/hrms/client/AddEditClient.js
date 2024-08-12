import PropTypes from "prop-types";
import { Button, DialogContent, Grid, Stack } from "@mui/material";
import FormikControl from "@/component/formik/FormikControl";
import { countryList } from "@/constant/CountryList";
import { indiaStateList } from "@/constant/IndiaStateList";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { gridSpacing } from "@/store/constant";
import MainCard from "@/ui-component/cards/MainCard";
import AnimateButton from "@/ui-component/extended/AnimateButton";
import * as yup from "yup";

// redux toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  addClientAction,
  updateClientAction,
} from "@/redux-toolkit/reducer/clientReducer";

// assets
import LinkIcon from "@mui/icons-material/Link";
import SecondaryAction from "@/ui-component/cards/CardSecondaryAction";
import { useEffect } from "react";
import { SNACKBAR_OPEN } from "@/redux-toolkit/reducer/snackbarReducer";

const AddEditClient = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, update } = useSelector((state) => state.client);

  const isAddMode = !formValues.id;

  const initialValues = {
    clientName: "",
    primaryContactNo: "",
    secondaryContactNo: "",
    emailId: "",
    address: "",
    pinCode: "",
    country: "",
    state: "",
  };

  const validationSchema = yup.object({
    clientName: yup.string().required("Client name is required"),
    emailId: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    primaryContactNo: yup
      .string()
      .matches(/^\d{10}$/, "Enter a valid contact number")
      .required("Primary Contact no is required"),
    // secondaryContactNo: yup.string().matches(/^\d{10}$/, 'Enter a valid contact number').required('Secondary Contact no is required'),
    pinCode: yup
      .string()
      .matches(/^[1-9]\d{5}$/, "Enter a valid pincode")
      .required("Pincode is required"),
  });

  const onSubmit = (values) => {
    console.log("Values ===>  ", values);
    if (isAddMode) {
      dispatch(addClientAction({ dataAddClient: values, onCancel, navigate }));
      if (error) {
        console.log("ERROR : ", error);
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: error,
            variant: "alert",
            alertSeverity: "error",
          })
        );
      }
    } else {
      dispatch(
        updateClientAction({ dataUpdateClient: values, onCancel, navigate })
      );

      if (update) {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: "Employee updated Successfully",
            variant: "alert",
            alertSeverity: "success",
          })
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: error,
          variant: "alert",
          alertSeverity: "error",
        })
      );
    }
  }, [dispatch, error]);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={isAddMode ? "Client Registration" : "Update Client"}
            secondary={
              <SecondaryAction
                icon={<LinkIcon fontSize="small" />}
                link="https://formik.org/docs/examples/with-material-ui"
              />
            }
          >
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Form autoComplete="off">
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          label="Client Name"
                          name="clientName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          name="emailId"
                          label="Email Id"
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          label="Address"
                          name="address"
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          type="Number"
                          name="primaryContactNo"
                          label="Primary Contact"
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          type="Number"
                          label="Secondary Contact"
                          name="secondaryContactNo"
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="select"
                          name="country"
                          label="Country"
                          options={countryList}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="select"
                          label="State"
                          name="state"
                          options={indiaStateList}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control="input"
                          name="pinCode"
                          label="Pincode"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          <AnimateButton>
                            <Button variant="contained" type="submit">
                              {isAddMode ? "Submit" : "Update"}
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
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

AddEditClient.propTypes = {
  formValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};

export default AddEditClient;
