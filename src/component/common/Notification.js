import { Button, Dialog, DialogContent, Grid, Stack } from '@mui/material';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';

// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';

import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

import * as React from 'react';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Notification = ({ action, onCancel, serviceFunction, values }) => {
  const refComfirm = React.useRef('');
  const refDeny = React.useRef('');
  const dispatch = useDispatch();

  const comfirmHandler = () => {
    console.log(refComfirm.current.textContent);
    if (refComfirm.current.textContent === 'Yes') {
      serviceFunction({ ...values }).then((data) => {
        if (data.reason) {
          dispatch(
            SNACKBAR_OPEN({
              open: true,
              message: data.message,
              variant: 'alert',
              alertSeverity: 'error',
            })
          );
        } else {
          dispatch(
            SNACKBAR_OPEN({
              open: true,
              message: 'Deleted Successfully',
              variant: 'alert',
              alertSeverity: 'error',
            })
          );
        }
      });
    }
    onCancel();
  };

  const denyHandler = () => {
    console.log(refDeny.current.textContent);
    onCancel();
  };

  return (
    <Dialog TransitionComponent={Transition} open={true}>
      <Grid container spacing={gridSpacing} justifyContent='center'>
        <Grid item xs={12} md={12} lg={12}>
          <DialogContent sx={{ p: 3 }}>
            <MainCard
              title='Alert !'
              secondary={
                <SecondaryAction
                  icon={<LinkIcon fontSize='small' />}
                  link='https://formik.org/docs/examples/with-material-ui'
                />
              }>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                  Are you sure, do want to {action}
                </Grid>

                <Grid item xs={12}>
                  <Stack direction='row' justifyContent='flex-end'>
                    <AnimateButton>
                      <Button
                        variant='contained'
                        ref={refComfirm}
                        onClick={comfirmHandler}>
                        Yes
                      </Button>
                    </AnimateButton>

                    <AnimateButton>
                      <Button
                        sx={{ mx: 0.5 }}
                        variant='contained'
                        ref={refDeny}
                        onClick={denyHandler}>
                        No
                      </Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </DialogContent>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Notification;
