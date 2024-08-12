import PropTypes from "prop-types";

// material-ui
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// project imports
import Avatar from "@/ui-component/extended/Avatar";
import SubCard from "@/ui-component/cards/SubCard";
import { gridSpacing } from "@/store/constant";

// assets
import { IconEdit } from "@tabler/icons-react";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";

import Avatar3 from "../../../assets/images/users/avatar-3.png";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getClientById } from "@/service/ClientService";

// progress
function LinearProgressWithLabel({ value, ...other }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress {...other} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const ClientProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const loadClientById = useCallback(async () => {
    await getClientById(id).then((res) => {
      if (res) {
        console.log("Res ", res);
        setData(res);
      }
    });
  }, [id]);

  useEffect(() => {
    loadClientById();
  }, [loadClientById]);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Full Name", ":", data.clientName),
    createData("Address", ":", data.address),
    createData("Zip Code", ":", data.pinCode),
    createData("Aadhar card", ":", data.aadharCardNo),
    createData("Pan card", ":", data.panCardNo),
    createData("Country", ":", data.country),
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={4} xs={12}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt="User 1" src={Avatar3} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  {data.clientName}
                </Typography>
                <Typography align="left" variant="subtitle2">
                  {data.designation}
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Pro" color="primary" />
              </Grid>
            </Grid>
          }
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton>
              <ListItemIcon>
                <MailTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Email</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {data.emailId}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Phone</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {data.primaryContactNo}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Phone 2</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {data.secondaryContactNo}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PinDropTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Location</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {data.state}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </SubCard>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Grid container direction="column" spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard
              title="Personal Detail"
              secondary={
                <Button>
                  <IconEdit stroke={1.5} size="1.3rem" />
                </Button>
              }
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <TableContainer>
                    <Table
                      sx={{
                        "& td": {
                          borderBottom: "none",
                        },
                      }}
                      size="small"
                    >
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell variant="head">{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientProfile;
