// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports

import AuthFooter from '@/ui-component/cards/AuthFooter';

// assets
import NewUserForm from './NewUserForm';
import AuthCardWrapper from '@/authentication/AuthCardWrapper';

// ===============================|| AUTH2 - REGISTER ||=============================== //

const NewUser = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Grid
      container
      justifyContent={matchDownSM ? 'center' : 'space-between'}
      alignItems='center'>
      <Grid item md={12} lg={12} xs={12} sx={{ minHeight: '5vh' }}>
        <Grid
          sx={{ minHeight: '5vh' }}
          container
          alignItems='center'
          justifyContent='center'>
          <Grid
            item
            xs={12}
            container
            justifyContent='center'
            alignItems='center'
            sx={{
              minHeight: {
                xs: 'calc(100vh - 90px)',
                md: 'calc(100vh - 152px)',
              },
            }}>
            <Stack
              justifyContent='center'
              alignItems='center'
              spacing={5}
              m={2}>
              <AuthCardWrapper border={matchDownMD}>
                <Grid container spacing={2} justifyContent='center'>
                  <Grid item xs={12}>
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      spacing={1}>
                      <Typography
                        color={theme.palette.secondary.main}
                        gutterBottom
                        variant={matchDownSM ? 'h3' : 'h2'}>
                        Create User
                      </Typography>
                      <Typography
                        variant='caption'
                        fontSize='16px'
                        textAlign={matchDownSM ? 'center' : 'inherit'}>
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <NewUserForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction='column'
                      alignItems='center'
                      xs={12}></Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ m: 3 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        lg={5}
        sx={{
          position: 'relative',
          alignSelf: 'stretch',
          display: { xs: 'none', md: 'block' },
        }}></Grid>
    </Grid>
  );
};

export default NewUser;
