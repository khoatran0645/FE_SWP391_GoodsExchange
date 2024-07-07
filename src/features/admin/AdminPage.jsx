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
import AddModerator from "./AddModerator";

export default function AdminPage() {
  const [page, setPage] = useState(1);
  const postListModerator = useStore((state) => state.postListModerator);
  const [listModerator, setListModerator] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data with page:", page);
      await postListModerator(page, 10);
      const moderatorList = useStore.getState().moderatorList;
      console.log("Fetched moderator list:", moderatorList);
      setListModerator(moderatorList || []);
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [page, postListModerator]);

  return (
    <>
      <AdminNavBar />
      <Container>
        <Box marginTop={8}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Moderator List
          </Typography>
          <AddModerator />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Moderator table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listModerator.length > 0 ? (
                  listModerator.map((moderator, index) => (
                    <TableRow key={index}>
                      <TableCell>{moderator.firstName}</TableCell>
                      <TableCell>{moderator.lastName}</TableCell>
                      <TableCell>{moderator.email}</TableCell>
                      <TableCell>{moderator.roleName}</TableCell>
                      <TableCell>
                        {/* <IconButton
                          component={Link}
                          to={`/staff_detail/${moderator.id}`}
                          aria-label="view"
                        >
                          View
                        </IconButton> */}
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
