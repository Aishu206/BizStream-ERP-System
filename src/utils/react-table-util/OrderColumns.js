// import { Button } from '@mui/material';
import FileViewer from '@/utils/FileViewer';

const height = 120;
const width = 120;

export const OrderColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    show: false,
  },
  {
    Header: 'Client Name',
    accessor: 'clientName',
  },
  {
    Header: 'Created By',
    accessor: 'createdName',
  },
  {
    Header: 'Image',
    accessor: 'productImageLink',
    Cell: ({ value }) => {
      return <FileViewer productUrl={value} width={width} height={height} />;
    },
  },
  {
    Header: 'Product Name',
    accessor: 'productName',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Order Date',
    accessor: 'orderDate',
  },
  {
    Header: 'Delivery Date',
    accessor: 'deliveryDate',
  },
  {
    Header: 'Message',
    accessor: 'message',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
