import React from 'react';
import { Box, FormHelperText, Grid } from '@mui/material';

const ErrorMessage = ({ error }) => {
  return (
    <Grid justifyContent='center' item xs={12} md={12} lg={12}>
      <Box sx={{ m: 3 }}>
        <FormHelperText error>{error}</FormHelperText>
      </Box>
    </Grid>
  );
};

export default ErrorMessage;
