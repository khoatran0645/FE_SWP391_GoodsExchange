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
  Rating,
} from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function AdminUser() {
  const [page, setPage] = useState(1);
  const postListUser = useStore((state) => state.postListUser);
  const patchStatusModerator = useStore((state) => state.patchStatusModerator);
  const userList = useStore((state) => state.userList);
  const totalPages = useStore((state) => state.totalPages);
  const [sortConfig, setSortConfig] = useState({
    key: "numberReports",
    direction: "desc",
  });

  useEffect(() => {
    fetchUser();
  }, [page]);

  const fetchUser = async () => {
    console.log("Fetching data with page:", page);
    await postListUser(page, 10);
  };

  const handleDelete = async (id, status) => {
    console.log("id", id);
    console.log("status", status);
    await patchStatusModerator(id, !status);
    await fetchUser(); // Refresh user list after status change
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const userRoleList = userList.filter((user) => user.roleName === "User");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...userRoleList].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getReportColor = (reportCount) => {
    if (reportCount >= 0 && reportCount <= 2) {
      return "green";
    } else if (reportCount >= 3 && reportCount <= 4) {
      return "orange";
    } else if (reportCount >= 5) {
      return "red";
    }
  };

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
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">
                    Rating Stars
                    <IconButton
                      onClick={() => handleSort("averageNumberStars")}
                    >
                      {sortConfig.key === "averageNumberStars" &&
                      sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    Report
                    <IconButton onClick={() => handleSort("numberReports")}>
                      {sortConfig.key === "numberReports" &&
                      sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers.length > 0 ? (
                  sortedUsers.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell align="center">{user.firstName}</TableCell>
                      <TableCell align="center">{user.lastName}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.roleName}</TableCell>
                      <TableCell align="center">
                        <Rating
                          name="read-only"
                          value={user ? user.averageNumberStars : 0}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <Box>
                          <Typography variant="body2" component="p">
                            {user?.numberOfRatings}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: getReportColor(user.numberReports),
                          fontWeight: "bold",
                        }}
                      >
                        {user.numberReports}
                      </TableCell>
                      <TableCell align="center">
                        {user.numberReports >= 5 && (
                          <IconButton
                            onClick={() =>
                              handleDelete(user.userId, user.status)
                            }
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
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
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
