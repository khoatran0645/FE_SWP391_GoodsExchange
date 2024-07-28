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

export default function AdminUser() {
  const [page, setPage] = useState(1);
  const postListModerator = useStore((state) => state.postListModerator);
  const patchStatusModerator = useStore((state) => state.patchStatusModerator);
  const [listModerator, setListModerator] = useState([]);

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

  const handleDelete = async (id, status) => {
    console.log("id", id);
    console.log("status", status);
    await patchStatusModerator(id, !status);
    await postListModerator(page, 10);
    const moderatorList = useStore.getState().moderatorList;
    setListModerator(moderatorList || []);
  };
  return (
    <>
      <Container>
        <Box marginTop={1}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            User List
          </Typography>

          <AddModerator onAdd={fetchModerators} />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Moderator table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell> */}
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listModerator.length > 0 ? (
                  listModerator.map((moderator) => (
                    <TableRow key={moderator.userId}>
                      <TableCell>{moderator.firstName}</TableCell>
                      <TableCell>{moderator.lastName}</TableCell>
                      <TableCell>{moderator.email}</TableCell>
                      {/* <TableCell>{moderator.userName}</TableCell>
                      <TableCell>{moderator.password}</TableCell> */}
                      <TableCell>{moderator.roleName}</TableCell>
                      <TableCell>
                        {/* <EditMod /> */}

                        <IconButton
                          color={moderator.status ? "error" : "success"}
                          onClick={() =>
                            handleDelete(moderator.userId, moderator.status)
                          }
                          aria-label="toggle status"
                        >
                          {moderator.status ? "Deactive" : "Reactive"}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
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
