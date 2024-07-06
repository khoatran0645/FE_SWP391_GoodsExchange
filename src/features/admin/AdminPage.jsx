import AdminNavBar from "./AdminNavBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Container,
} from "@mui/material";
import useStore from "../../app/store";

export default function AdminPage() {
  const [staffData, setStaffData] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const getUserForAdminPage = useStore((state) => state.getUserForAdminPage);

  const [params, setParams] = useState({
    keyword: "a",
    firstname: "",
    lastname: "",
    email: "",
    rolename: "",
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = () => {
    fetch("https://6678e28b0bd4525056202376.mockapi.io/api/v1/staffManagement")
      .then((res) => res.json())
      .then((data) => {
        setStaffData(data);
      });
  };

  const handleDelete = (id) => {
    setConfirmationOpen(true);
    setDeletingId(id);
  };

  const confirmDelete = () => {
    fetch(
      `https://6678e28b0bd4525056202376.mockapi.io/api/v1/staffManagement/${deletingId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          setNotificationMessage(
            `Staff with ID ${deletingId} deleted successfully.`
          );
          setNotificationOpen(true);
          // Remove the deleted staff from the staffData state
          setStaffData(staffData.filter((staff) => staff.id !== deletingId));
        } else {
          console.error(`Failed to delete staff with ID ${deletingId}.`);
          setNotificationMessage(
            `Failed to delete staff with ID ${deletingId}.`
          );
          setNotificationOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
        setNotificationMessage(`Error deleting staff: ${error.message}`);
        setNotificationOpen(true);
      })
      .finally(() => {
        setConfirmationOpen(false);
      });
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setDeletingId(null);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };
  return (
    <>
      <AdminNavBar />
      <Container>
        <Box marginTop={8}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Moderator List
          </Typography>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Staff table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.address}</TableCell>
                    <TableCell>{staff.age}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/staff_detail/${staff.id}`}
                        aria-label="view"
                      >
                        View
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/edit_staff/${staff.id}`}
                        aria-label="edit"
                      >
                        Edit
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(staff.id)}
                        aria-label="delete"
                      >
                        Delete
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={confirmationOpen}
            onClose={handleCloseConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this staff member?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={notificationOpen}
            autoHideDuration={2000}
            onClose={handleCloseNotification}
            message={notificationMessage}
          />
        </Box>
      </Container>
    </>
  );
}
