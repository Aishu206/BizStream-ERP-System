import PropTypes from 'prop-types';
import GlobalFilterOnReactTable from '@/component/filter/GlobalFilterOnReactTable';

// material-ui
import { Fab, CardContent, Grid, IconButton, Tooltip } from '@mui/material';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import AddIcon from '@mui/icons-material/AddTwoTone';

const RenderTableSearchBox = ({
  globalFilter,
  setGlobalFilter,
  addForm,
  title,
}) => {
  return (
    <CardContent>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        spacing={2}>
        <Grid item xs={12} sm={6}>
          <GlobalFilterOnReactTable
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Tooltip title='Copy'>
            <IconButton size='large'>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Print'>
            <IconButton size='large'>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter'>
            <IconButton size='large'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={title}>
            <Fab
              onClick={() => addForm()}
              color='primary'
              size='small'
              sx={{
                boxShadow: 'none',
                ml: 1,
                width: 32,
                height: 32,
                minHeight: 32,
              }}>
              <AddIcon fontSize='small' />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </CardContent>
  );
};

RenderTableSearchBox.propTypes = {
  globalFilter: PropTypes.any, // Adjust the prop type based on its actual type
  setGlobalFilter: PropTypes.func.isRequired,
  addForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
export default RenderTableSearchBox;
