import PropTypes from 'prop-types';
import { Table, TableContainer } from '@mui/material';
import RenderTableHeader from './RenderTableHeader';
import RenderTableBody from './RenderTableBody';

const RenderTable = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  onModuleDetail,
  onEditModule,
}) => {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby='tableTitle'
        {...getTableProps()}>
        <RenderTableHeader headerGroups={headerGroups} />
        <RenderTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          onModuleDetail={onModuleDetail}
          onEditModule={onEditModule}
        />
      </Table>
    </TableContainer>
  );
};

RenderTable.propTypes = {
  getTableProps: PropTypes.func.isRequired,
  headerGroups: PropTypes.array.isRequired,
  getTableBodyProps: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  onModuleDetail: PropTypes.func.isRequired,
  onEditModule: PropTypes.func.isRequired,
};

export default RenderTable;
