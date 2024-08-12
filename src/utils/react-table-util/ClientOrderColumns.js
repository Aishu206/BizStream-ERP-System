import FileViewer from "@/utils/FileViewer";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    show: false,
  },
  {
    Header: "Order Date",
    accessor: "createdDateTime",
  },
  {
    Header: "Image",
    accessor: "productImageLink",
    Cell: ({ value }) => {
      return <FileViewer productUrl={value} width={"96"} height={"65"} />;
    },
  },
  {
    Header: "Product Name",
    accessor: "productName",
  },
  {
    Header: "Delivery Date",
    accessor: "deliveryDate",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Advance Paid",
    accessor: "advanceAmount",
  },
  {
    Header: "Balance",
    accessor: "balanceAmount",
  },
];
