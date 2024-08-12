import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';

// project imports
import Avatar from '@/ui-component/extended/Avatar';

// assets
import CircleIcon from '@mui/icons-material/Circle';

import { useState } from 'react';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import { gridSpacing } from '@/store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import MaterialProfile from './MaterialProfile';
import MaterialConsumptionList from '@/container/inventory/material/MaterialConsumptionList';
import ProductImages from '@/container/inventory/product/ProductImages';

// ==============================|| COLORS OPTION ||============================== /

const Colors = ({ checked, colorsData }) => {
  const theme = useTheme();
  return (
    <Grid item>
      <Tooltip title={colorsData[0].label}>
        <ButtonBase sx={{ borderRadius: '50%' }}>
          <Avatar
            color='inherit'
            size='badge'
            sx={{
              bgcolor: colorsData[0].bg,
              color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800',
            }}>
            {checked && (
              <CircleIcon
                sx={{
                  color:
                    theme.palette.mode === 'light' ? 'grey.50' : 'grey.800',
                  fontSize: '0.75rem',
                }}
              />
            )}
            {!checked && (
              <CircleIcon
                sx={{ color: colorsData[0].bg, fontSize: '0.75rem' }}
              />
            )}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Grid>
  );
};

Colors.propTypes = {
  checked: PropTypes.bool,
  colorsData: PropTypes.array,
};

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
    label: 'Material Info',
    icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
  },
  {
    label: 'Consumption List',
    icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
  },
];

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const MaterialInfo = ({ material }) => {
  const theme = useTheme();

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
          <Divider />
          <br />
          <TabPanel value={value} index={0}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <ProductImages materialImageLink={material.materialImageLink} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MaterialProfile material={material} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MaterialConsumptionList materialId={material.id} />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default MaterialInfo;
