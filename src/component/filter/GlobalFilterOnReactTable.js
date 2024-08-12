import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const GlobalFilterOnReactTable = ({ filter, setFilter }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon fontSize='small' />
          </InputAdornment>
        ),
      }}
      fullWidth
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder='Search'
      size='small'
    />
  );
};

GlobalFilterOnReactTable.propTypes = {
  filter: PropTypes.string, 
  setFilter: PropTypes.func.isRequired,
};
export default GlobalFilterOnReactTable;
