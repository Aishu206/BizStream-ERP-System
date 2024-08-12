import { useState, useMemo, useEffect, useCallback } from "react";
import { useTable, useGlobalFilter } from "react-table";

// material-ui
import {
  Fab,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  MenuItem,
  Menu,
  Button,
  Pagination,
} from "@mui/material";

// assets
import FilterListIcon from "@mui/icons-material/FilterListTwoTone";
import PrintIcon from "@mui/icons-material/PrintTwoTone";
import FileCopyIcon from "@mui/icons-material/FileCopyTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/AddTwoTone";
import { useTheme } from "@mui/styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { getAllExpense } from "@/service/ExpenseService";
import { ExpenseColumns } from "@/utils/react-table-util/ExpenseColumns";
import MainCard from "@/ui-component/cards/MainCard";
import GlobalFilterOnReactTable from "@/component/filter/GlobalFilterOnReactTable";
import AddEditExpense from "./AddEditExpense";
import { gridSpacing } from "@/store/constant";

// ==============================|| PRODUCT LIST ||============================== //

const ExpenseList = () => {
  const [Expenses, setExpenses] = useState([]);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePageSize = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setPageSize(event.target.value);
    loadAllExpense();
  };

  const handlePage = (event, value) => {
    setPage(value - 1);
  };

  const loadAllExpense = useCallback(async () => {
    await getAllExpense(page, pageSize).then((data) => {
      const res = data;
      if (res) {
        setExpenses(res.data);
        setTotalPage(data.totalPages);
      }
    });
  }, [page, pageSize]);

  useEffect(() => {
    loadAllExpense();
  }, [page, loadAllExpense]);

  const onAddExpense = () => {
    console.log("Add Expense form route");
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const onEditExpense = (expense) => {
    setEditFormModel(expense);
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    loadAllExpense();
    setIsModelOpen(false);
  };

  const columns = useMemo(() => ExpenseColumns, []);
  const data = useMemo(() => Expenses, [Expenses]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return "";
        }),
      },
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <MainCard title="Expense List" content={false}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <GlobalFilterOnReactTable
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
            <Tooltip title="Copy">
              <IconButton size="large">
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton size="large">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton size="large">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Expense">
              <Fab
                onClick={() => onAddExpense()}
                color="primary"
                size="small"
                sx={{
                  boxShadow: "none",
                  ml: 1,
                  width: 32,
                  height: 32,
                  minHeight: 32,
                }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>

      {/* table */}
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                className="bg-primary"
              >
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()} key={column.id}>
                    {column.render("Header")}
                  </TableCell>
                ))}
                <TableCell>Edit</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                  <TableCell onClick={() => onEditExpense(row.original)}>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" size="large">
                        <EditIcon sx={{ fontSize: "1.3rem" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Pagination
              count={totalPage}
              page={page + 1}
              color="primary"
              onChange={handlePage}
            />
          </Grid>
          <Grid item>
            <Button
              size="large"
              sx={{ color: theme.palette.grey[900] }}
              color="secondary"
              endIcon={<ExpandMoreRoundedIcon />}
              onClick={handlePageSize}
            >
              {pageSize} Rows
            </Button>
            <Menu
              id="menu-user-list-style1"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant="selectedMenu"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleClose} value="10">
                {" "}
                10 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value="20">
                {" "}
                20 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value="30">
                {" "}
                30 Rows{" "}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        onClose={handleModelClose}
        open={isModelOpen}
        sx={{ "& .MuiDialog-paper": { p: 0 } }}
      >
        {isModelOpen && (
          <AddEditExpense onCancel={handleModelClose} formValues={formValues} />
        )}
      </Dialog>
    </MainCard>
  );
};

export default ExpenseList;
