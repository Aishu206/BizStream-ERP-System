import React from 'react';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import { gridSpacing } from '@/store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import PuchasingDetails from './PuchasingDetails';
import VendorProfile from './VendorProfile';
import PaymentDetails from './PaymentDetails';

// tabs panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// tabs option
const tabsOption = [
  {
    label: 'Profile',
    icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
  },
  {
    label: 'Purchsing Details',
    icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
  },
  {
    label: 'Payment Details',
    icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
  },
];

// ==============================|| PROFILE 1 ||============================== //

const VendorDetail = () => {
  const theme = useTheme();
  const { id } = useParams();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleChange}
            aria-label='simple tabs example'
            variant='scrollable'
            sx={{
              mb: 3,
              '& a': {
                minHeight: 'auto',
                minWidth: 10,
                py: 1.5,
                px: 1,
                mr: 2.25,
                color: theme.palette.grey[600],
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& a.Mui-selected': {
                color: theme.palette.primary.main,
              },
              '& .MuiTabs-indicator': {
                bottom: 2,
              },
              '& a > svg': {
                marginBottom: '0px !important',
                mr: 1.25,
              },
            }}>
            {tabsOption.map((tab, index) => (
              <Tab
                key={index}
                component={Link}
                to='#'
                icon={tab.icon}
                label={tab.label}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <TabPanel value={value} index={0}>
            <VendorProfile id={id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PuchasingDetails empId={id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PaymentDetails empId={id} />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default VendorDetail;
