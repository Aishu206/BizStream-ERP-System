import PropTypes from 'prop-types';
// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';

const RenderTableHeader = ({ headerGroups }) => {
  return (
    <TableHead>
      {headerGroups.map((headerGroup, index) => (
        <TableRow
          key={index}
          {...headerGroup.getHeaderGroupProps()}
          className='bg-primary'>
          {headerGroup.headers.map((column) => (
            <TableCell key={column.id} {...column.getHeaderProps()}>
              {column.render('Header')}
            </TableCell>
          ))}
          <TableCell>Edit</TableCell>
        </TableRow>
      ))}
    </TableHead>
  );
};

RenderTableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
};

export default RenderTableHeader;
