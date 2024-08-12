// material-ui
import { Grid } from '@mui/material';

// project imports
import BasicWizard from './BasicWizard';
import { gridSpacing } from 'store/constant';

// ==============================|| FORMS WIZARD ||============================== //

const Employee = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} md={9} lg={7}>
            <BasicWizard />
        </Grid>
    </Grid>
);

export default Employee;
