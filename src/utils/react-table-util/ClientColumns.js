import { Button } from '@mui/material';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    show: false,
  },
  {
    Header: 'Client Name',
    accessor: 'clientName',
    Cell: ({ value }) => {
      return <Button>{value}</Button>;
    },
  },
  {
    Header: 'Email Id',
    accessor: 'emailId',
  },
  {
    Header: 'Contact No',
    accessor: 'primaryContactNo',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
];
