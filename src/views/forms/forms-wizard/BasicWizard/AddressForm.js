// material-ui
import { Grid, Typography, TextField } from '@mui/material';
// ==============================|| FORM WIZARD - BASIC  ||============================== //

/*
/firstName
/lastName
/designation
perDayWages
primaryContactNo
secondaryContactNo
empImageLink
address
aadharCardNo
pancardNo
/city
/state
/country
orgName
//date
//status
*/
export default function AddressForm() {
    return (
        <>
        
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Employee Registration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id="firstNameBasic" name="firstName" label="First name" fullWidth autoComplete="given-name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastNameBasic" name="lastName" label="Last name" fullWidth autoComplete="family-name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1Basic"
                        name="address1"
                        label="Designation"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="address2Basic" name="address2" label="Per Day Wages" fullWidth autoComplete="shipping address-line2" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="address2Basic" name="address3" label="Address" fullWidth autoComplete="shipping address-line2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="cityBasic" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="stateBasic" name="state" label="State/Province/Region" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="zipBasic" name="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="countryBasic" name="country" label="Country" fullWidth autoComplete="shipping country" />
                </Grid>
            </Grid>
        </>
    );
}
