export const ExpenseColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    show: false,
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Order By',
    accessor: 'orderBy',
  },
  {
    Header: 'Vendor Name',
    accessor: 'vendorName',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Amount Paid',
    accessor: 'amountPaid',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
  
      Header: 'Balance',
      accessor: (row) => row.amount - row.amountPaid,
    },
    
  
];
