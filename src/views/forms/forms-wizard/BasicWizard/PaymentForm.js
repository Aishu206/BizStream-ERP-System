// material-ui
import { Grid, TextField, Typography } from '@mui/material';

// ==============================|| FORM WIZARD - BASIC  ||============================== //

/*
primaryContactNo
secondaryContactNo
empImageLink
// address
// aadharCardNo
pancardNo
orgName
date
status*/
export default function PaymentForm() {
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Employee Registration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField required id="contactnumber" label="Primary Contact No" fullWidth autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="seccontactnumber" label="Secondary Contact Number" fullWidth autoComplete="cc-number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="aadharcardnumber" label="Aadhar Card Number" fullWidth autoComplete="cc-number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="pancardno" label="Pan Card Number" fullWidth autoComplete="cc-exp" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="orgName"
                        label="Org Name"
                        helperText="Enter Organizantion Name"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    );
}
