// material-ui
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// project imports
import GridTable from './GridTable';
import MainCard from '@/ui-component/cards/MainCard';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '@/store/constant';

// table data
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// ==============================|| TABLE - BASIC ||============================== //

export default function TableBasic() {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard
          content={false}
          title='Basic Table'
          secondary={
            <SecondaryAction link='https://next.material-ui.com/components/tables/' />
          }>
          {/* table */}
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Dessert (100g serving)</TableCell>
                  <TableCell align='right'>Calories</TableCell>
                  <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                  <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                  <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                  <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                  <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                  <TableCell align='right' sx={{ pr: 3 }}>
                    Protein&nbsp;(g)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow hover key={row.name}>
                    <TableCell sx={{ pl: 3 }} component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.calories}</TableCell>
                    <TableCell align='right'>{row.fat}</TableCell>
                    <TableCell align='right'>{row.carbs}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell align='right'>{row.protein}</TableCell>
                    <TableCell sx={{ pr: 3 }} align='right'>
                      {row.protein}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard
          content={false}
          title='Data Grid'
          secondary={
            <SecondaryAction link='https://material-ui.com/components/data-grid/' />
          }>
          {/* table data grid */}
          <GridTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
