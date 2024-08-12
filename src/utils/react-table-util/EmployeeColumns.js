import { Button } from '@mui/material';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    show: false,
  },
  {
    Header: 'Full Name',
    accessor: 'fullName',
    Cell: ({ value }) => {
      return <Button>{value}</Button>;
    },
  },
  {
    Header: 'Father Name',
    accessor: 'fatherName',
  },
  {
    Header: 'Per Day Wages',
    accessor: 'perDayWages',
  },
  {
    Header: 'Contact No',
    accessor: 'primaryContactNo',
  },
  {
    Header: 'Aadhar Card No',
    accessor: 'aadharCardNo',
  },
];
