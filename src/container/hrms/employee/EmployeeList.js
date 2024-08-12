import { useState, useMemo, useCallback } from "react";
import { useTable, useGlobalFilter } from "react-table";

import { COLUMNS } from "@/utils/react-table-util/EmployeeColumns";
import GlobalFilterOnReactTable from "@/component/filter/GlobalFilterOnReactTable";

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
  Pagination,
  MenuItem,
  Button,
  Menu,
} from "@mui/material";

// project imports
import MainCard from "@/ui-component/cards/MainCard";

// assets
import FilterListIcon from "@mui/icons-material/FilterListTwoTone";
import PrintIcon from "@mui/icons-material/PrintTwoTone";
import FileCopyIcon from "@mui/icons-material/FileCopyTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/AddTwoTone";
import AddEditEmployee from "./AddEditEmployee";
import { getAllEmployees } from "@/service/EmployeeService";
import { useEffect } from "react";
import { gridSpacing } from "@/store/constant";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useTheme } from "@mui/styles";
import { useNavigate } from "react-router-dom";
// ==============================|| PRODUCT LIST ||============================== //

import { useSelector, useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/redux-toolkit/reducer/snackbarReducer";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { add, update } = useSelector((state) => state.employee);

  const [employees, setEmployees] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formValues, setEditFormModel] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const navigate = useNavigate();

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (add) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: "New Employee Added Successfully",
          variant: "alert",
          alertSeverity: "success",
        })
      );
    } else if (update) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: "Employee updated Successfully",
          variant: "alert",
          alertSeverity: "success",
        })
      );
    }
  }, [dispatch, add, update]);

  const handlePageSize = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const page = event.target.value ? event.target.value : 100;
    setPageSize(page);
    loadAllEmployees();
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => employees, [employees]);

  const loadAllEmployees = useCallback(async () => {
    await getAllEmployees(page, pageSize).then((data) => {
      console.log(data);
      if (data) {
        setEmployees(data.employeeList);
        setTotalPage(data.totalPage);
      }
    });
  }, [page, pageSize]);

  useEffect(() => {
    loadAllEmployees();
  }, [page, loadAllEmployees]);

  const addEmployeeForm = () => {
    console.log("Add Employee form route");
    setEditFormModel(false);
    setIsModelOpen(true);
  };

  const onEditEmployee = (employee) => {
    console.log(employee);
    setEditFormModel(employee);
    setIsModelOpen(true);
  };

  const onEmployeeDetail = (employee) => {
    console.log(employee);
    navigate(`/app/employee-detail/${employee.id}`, { state: employee });
  };

  const handleModelClose = () => {
    loadAllEmployees();
    setIsModelOpen(false);
  };

  const handlePage = (event, value) => {
    setPage(value - 1);
  };

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
    <MainCard title="Employee List" content={false}>
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
            <Tooltip title="Add Employee">
              <Fab
                onClick={() => addEmployeeForm()}
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
                {...headerGroup.getHeaderGroupProps()}
                className="bg-primary"
                key={headerGroup.id}
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
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        onClick={() => onEmployeeDetail(row.original)}
                        key={cell.id}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                  <TableCell onClick={() => onEditEmployee(row.original)}>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" size="xs">
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
              <MenuItem onClick={handleClose} value="100">
                {" "}
                100 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value="200">
                {" "}
                200 Rows
              </MenuItem>
              <MenuItem onClick={handleClose} value="300">
                {" "}
                300 Rows{" "}
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
          <AddEditEmployee
            onCancel={handleModelClose}
            formValues={formValues}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default EmployeeList;
