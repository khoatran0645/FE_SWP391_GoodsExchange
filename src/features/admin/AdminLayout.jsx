import * as React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavBar />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          lg={2}
          sm={12}
          sx={{
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            height: "100vh",
            boxShadow: 3,
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: 3, textAlign: "center", color: "#333" }}
          >
            Panel
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/admin-mod")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Moderator Management
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/admin-user")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            User Management
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/dashboard")}
            sx={{
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Dashboard
          </Button>
        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
