import FileViewer from "@/utils/FileViewer";
const height = 120;
const width = 120;

export const ProductionColumns = [
  {
    Header: "Id",
    accessor: "id",
    show: false,
  },
  {
    Header: "Client Name",
    accessor: "clientName",
  },
  {
    Header: "Image",
    accessor: "productImageLink",
    Cell: ({ value }) => {
      return <FileViewer productUrl={value} width={width} height={height} />;
    },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Order Date",
    accessor: "orderDate",
  },
  {
    Header: "Delivery Date",
    accessor: "deliveryDate",
  },
  {
    Header: "Status",
    accessor: "statusValue",
  },
];
