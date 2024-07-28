import React, { useState, useEffect } from "react";
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
  Typography,
  Box,
  Container,
  Pagination,
} from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export default function AdminUser() {
  const [page, setPage] = useState(1);
  const postListUser = useStore((state) => state.postListUser);
  const patchStatusModerator = useStore((state) => state.patchStatusModerator);
  const [listUser, setListUser] = useState([]);
  const totalPages = useStore((state) => state.totalPages);

  const fetchUser = async () => {
    console.log("Fetching data with page:", page);
    await postListUser(page, 10);
    const userList = useStore.getState().userList;
    console.log("Fetched user list:", userList);
    setListUser(userList || []);
  };

  useEffect(() => {
    fetchUser();
  }, [page]);

  const handleDelete = async (id, status) => {
    console.log("id", id);
    console.log("status", status);
    await patchStatusModerator(id, !status);
    await postListUser(page, 10);
    const userList = useStore.getState().userList;
    setListUser(userList || []);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const userRoleList = listUser.filter((user) => user.roleName === "User");

  return (
    <>
      <Container>
        <Box marginTop={1}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            User List
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed" }} aria-label="User table">
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
                {userRoleList.length > 0 ? (
                  userRoleList.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.roleName}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDelete(user.userId, user.status)}
                          aria-label="toggle status"
                        >
                          {user.status ? (
                            <ToggleOnIcon
                              style={{ color: "green", fontSize: "2.5rem" }}
                            />
                          ) : (
                            <ToggleOffIcon
                              style={{ color: "red", fontSize: "2.5rem" }}
                            />
                          )}
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

          <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "black",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#FF204E",
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
