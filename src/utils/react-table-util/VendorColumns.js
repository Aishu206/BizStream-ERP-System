import { Button } from '@mui/material';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    show: false,
  },
  {
    Header: 'Vendor Name',
    accessor: 'vendorName',
    Cell: ({ value }) => {
      return <Button>{value}</Button>;
    },
  },
  {
    Header: 'Shop Name',
    accessor: 'shopName',
  },
  {
    Header: 'Email Id',
    accessor: 'emailId',
  },
  {
    Header: 'Contact No',
    accessor: 'primaryContactNo',
  },
];
