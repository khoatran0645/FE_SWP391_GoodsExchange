import AdminNavBar from "./AdminNavBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  TextField,
  Container,
} from "@mui/material";

export default function AdminPage() {
  const [staffData, setStaffData] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const fetchModerators = async () => {
    console.log("Fetching data with page:", page);
    await postListModerator(page, 10);
    const moderatorList = useStore.getState().moderatorList;
    console.log("Fetched moderator list:", moderatorList);
    setListModerator(moderatorList || []);
  };

  useEffect(() => {
    fetchModerators();
  }, [page]);

  return (
    <>
      <AdminNavBar />
      <Container>
        <Box marginTop={8}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Moderator List
          </Typography>
<<<<<<< HEAD
          <Button
            variant="contained"
            component={Link}
            to="/add-staff"
            sx={{
              mt: 2,
              marginBottom: 2,
              float: "right",
            }}
          >
            Add Moderator Account
          </Button>
=======

          <AddModerator onAdd={fetchModerators} />

>>>>>>> 3e46beaec1ee89cb8059268c06f924cb5ccd23c3
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Moderator table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listModerator.length > 0 ? (
                  listModerator.map((moderator) => (
                    <TableRow key={moderator.id}>
                      <TableCell>{moderator.firstName}</TableCell>
                      <TableCell>{moderator.lastName}</TableCell>
                      <TableCell>{moderator.email}</TableCell>
                      <TableCell>{moderator.roleName}</TableCell>
                      <TableCell>
                        <IconButton
                          component={Link}
                          to={`/edit_staff/${moderator.id}`}
                          aria-label="edit"
                        >
                          Edit
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(moderator.id)}
                          aria-label="delete"
                        >
                          Remove
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No moderators found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
