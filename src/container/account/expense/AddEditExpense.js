import PropTypes from "prop-types";
import { Button, DialogContent, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useState } from "react";
import { convertBase64 } from "@/utils/BasicUtils";
import { addExpense, updateExpense } from "@/service/ExpenseService";
import { SNACKBAR_OPEN } from "@/store/action/actions";
import { gridSpacing } from "@/store/constant";
import MainCard from "@/ui-component/cards/MainCard";
import ImageUploader from "@/component/common/ImageUploader";
import FormikControl from "@/component/formik/FormikControl";
import AnimateButton from "@/ui-component/extended/AnimateButton";

const AddEditExpense = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAddMode = !formValues.id;

  const [invoiceLink, setInvoiceLink] = useState("");

  const initialValues = {
    title: "",
    orderBy: "",
    vendorName: "",
    paidBy: "",
    amount: "",
    amountPaid: "",
    invoiceLink: "",
    description: "",
    orgId: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    orderBy: yup.string().required("Order By is required"),
    vendorName: yup.string().required("Vendor Name is required"),
    amount: yup.string().required("Amount is required"),
  });

  const setImageData = async (imageData) => {
    const base64 = await convertBase64(imageData);
    setInvoiceLink(base64);
  };

  const onSubmit = (values) => {
    console.log("Values ===>  ", values, isAddMode);
    if (isAddMode) {
      addExpense({ ...values, invoiceLink }).then((data) => {
        if (data.error) {
          alert("Error ", data.reason);
        } else {
          onCancel();
          navigate("/app/expense-list");
        }
      });
    } else {
      updateExpense(values).then((data) => {
        if (data.error) {
          alert("Error ", data.reason);
        } else {
          onCancel();
          navigate("/app/expense-list");
        }
      });
    }
    dispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Submit Success",
      variant: "alert",
      alertSeverity: "success",
    });
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={isAddMode ? "Add Expense Recept" : "Update Expense Recept"}
          >
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => {
                return (
                  <Form autoComplete="off">
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={12}>
                        <ImageUploader
                          parentImageSet={setImageData}
                          fieldLabel="Upload Invoice"
                          field="invoiceLink"
                          accept="*"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          label="Title"
                          name="title"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          label="Order By"
                          name="orderBy"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          label="Vendor Name"
                          name="vendorName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          label="Paid By"
                          name="paidBy"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          type="Number"
                          label="Amount"
                          name="amount"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control="input"
                          type="Number"
                          label="Amount Paid"
                          name="amountPaid"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control="textarea"
                          label="Description"
                          name="description"
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

AddEditExpense.propTypes = {
  onCancel: PropTypes.func.isRequired,
  formValues: PropTypes.object,
};

export default AddEditExpense;
