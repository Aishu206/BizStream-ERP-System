import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '@/redux-toolkit/reducer/userReducer';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Stack,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  Avatar,
  Dialog,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';
import User1 from '../../../../assets/images/users/user-round.svg';

// assets
import {
  IconLogout,
  IconSettings,
  IconPassword,
  IconUserPlus,
} from '@tabler/icons-react';

import ChangePassword from './ChangePassword';
import NewUser from './NewUser';
import { isAuthenticated, logoutUser } from '@/service/AuthService';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({ onCancel, handleSubmit }) => {
  // get user from local storage
  const { firstName } = JSON.parse(localStorage.getItem('user'));
  let hours = new Date().getHours();
  let greeting = '';
  if (hours) {
    if (hours < 12 && hours >= 4) {
      greeting = 'Good Morning';
    } else if (hours > 12 && hours <= 20) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night... have sleep';
    }
  }

  const dispatch = useDispatch();
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const user = isAuthenticated();
  const [open, setOpen] = useState(false);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // logout
  // const logoutHandler = () => {
  //   dispatch(LOGOUT({logout: logoutUser, navigate: navigate}))
  //   console.log('yep logout');
  //   // logoutUser();
  //   // navigate('/');
  // }

  const changePasswordHandler = () => {
    setIsModelOpen(true);
  };

  const createUserHandler = () => {
    setIsCreateUser(true);
  };

  const handleModelClose = () => {
    setIsModelOpen(false);
    setIsCreateUser(false);
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            color='inherit'
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size='1.5rem'
            color={theme.palette.primary.main}
          />
        }
        variant='outlined'
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='primary'
      />
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}>
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction='row' spacing={0.5} alignItems='center'>
                        <Typography variant='h4'>{greeting} </Typography>
                        <Typography
                          component='span'
                          variant='h4'
                          sx={{ fontWeight: 400 }}>
                          {user?.name}
                        </Typography>
                      </Stack>
                      <Typography variant='subtitle2'>{firstName}</Typography>
                    </Stack>
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}>
                    <List
                      component='nav'
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%',
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5,
                        },
                      }}>
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}>
                        <ListItemIcon>
                          <IconUserPlus stroke={1.5} size='1.3rem' />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Grid
                              container
                              spacing={1}
                              justifyContent='space-between'
                              onClick={createUserHandler}>
                              <Grid item>
                                <Typography variant='body2'>
                                  New User
                                </Typography>
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        selected={selectedIndex === 0}
                        onClick={(event) =>
                          handleListItemClick(
                            event,
                            0,
                            '/user/account-profile/profile1'
                          )
                        }>
                        <ListItemIcon>
                          <IconSettings stroke={1.5} size='1.3rem' />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='body2'>
                              Account Settings
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      {/* <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        selected={selectedIndex === 1}
                        onClick={(event) =>
                          handleListItemClick(
                            event,
                            1,
                            "/user/social-profile/posts"
                          )
                        }
                      > */}
                      {/* <ListItemIcon>
                          <IconUser stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Grid
                              container
                              spacing={1}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Typography variant="body2">
                                  Social Profile
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Chip
                                  label="02"
                                  size="small"
                                  sx={{
                                    bgcolor:
                                      theme.palette.mode === "dark"
                                        ? theme.palette.dark.dark
                                        : theme.palette.warning.dark,
                                    color: theme.palette.background.default,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          }
                        />
                      </ListItemButton> */}

                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}>
                        <ListItemIcon>
                          <IconPassword stroke={1.5} size='1.3rem' />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Grid
                              container
                              spacing={1}
                              justifyContent='space-between'
                              onClick={changePasswordHandler}>
                              <Grid item>
                                <Typography variant='body2'>
                                  Change Password
                                </Typography>
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                          }
                        />
                      </ListItemButton>

                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}>
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size='1.3rem' />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant='body2'
                              onClick={() =>
                                dispatch(
                                  LOGOUT({
                                    logout: logoutUser,
                                    navigate: navigate,
                                  })
                                )
                              }>
                              Logout
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isModelOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isModelOpen && (
          <ChangePassword onCancel={handleModelClose} formValues={formValues} />
        )}
      </Dialog>

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isCreateUser}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {isCreateUser && (
          <NewUser onCancel={handleModelClose} formValues={formValues} />
        )}
      </Dialog>
    </>
  );
};

export default ProfileSection;
