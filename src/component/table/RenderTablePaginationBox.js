import PropTypes from 'prop-types';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// material-ui
import { Grid, MenuItem, Menu, Button, Pagination } from '@mui/material';
import { gridSpacing } from '@/store/constant';

const RenderTablePaginationBox = ({
  theme,
  anchorEl,
  totalPage,
  page,
  pageSize,
  handlePage,
  handlePageSize,
  handleClose,
}) => {
  return (
    <Grid item xs={12} sx={{ p: 3 }}>
      <Grid container justifyContent='space-between' spacing={gridSpacing}>
        <Grid item>
          <Pagination
            count={totalPage}
            page={page + 1}
            color='primary'
            onChange={handlePage}
          />
        </Grid>
        <Grid item>
          <Button
            size='large'
            sx={{ color: theme.palette.grey[900] }}
            color='secondary'
            endIcon={<ExpandMoreRoundedIcon />}
            onClick={handlePageSize}>
            {pageSize} Rows
          </Button>
          <Menu
            id='menu-user-list-style1'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant='selectedMenu'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
            <MenuItem onClick={handleClose} value='100'>
              {' '}
              100 Rows
            </MenuItem>
            <MenuItem onClick={handleClose} value='200'>
              {' '}
              200 Rows
            </MenuItem>
            <MenuItem onClick={handleClose} value='300'>
              {' '}
              300 Rows{' '}
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

RenderTablePaginationBox.propTypes = {
  theme: PropTypes.object.isRequired, // Adjust the prop type based on its actual type
  anchorEl: PropTypes.object,
  totalPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
  handlePageSize: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RenderTablePaginationBox;
