import PropTypes from 'prop-types';

// material-ui
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const RenderTableBody = ({
  getTableBodyProps,
  rows,
  prepareRow,
  onModuleDetail,
  onEditModule,
}) => {
  return (
    <TableBody {...getTableBodyProps()}>
      {rows.map((row, index) => {
        prepareRow(row);
        return (
          <TableRow key={index} {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <TableCell
                  key={row.original.id}
                  {...cell.getCellProps()}
                  onClick={() => onModuleDetail(row.original)}>
                  {cell.render('Cell')}
                </TableCell>
              );
            })}
            <TableCell onClick={() => onEditModule(row.original)}>
              <Tooltip title='Edit'>
                <IconButton color='secondary' size='xs'>
                  <EditIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

RenderTableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  onModuleDetail: PropTypes.func.isRequired,
  onEditModule: PropTypes.func.isRequired,
};

export default RenderTableBody;
