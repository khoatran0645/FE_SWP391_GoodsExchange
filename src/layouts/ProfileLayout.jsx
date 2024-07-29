import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "../features/common/NavBar";

export default function ProfileLayout() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
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
            sx={{
              marginBottom: 3,
              textAlign: "center",
              color: "#333",
              fontFamily: "fantasy",
            }}
          >
            PROFILE PANEL
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/")}
            sx={{
              marginBottom: 3,
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
            Profile Information
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/request-trade")}
            sx={{
              marginBottom: 3,
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
            Request Trade
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/receive-trade")}
            sx={{
              marginBottom: 3,
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
            Receive Trade
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/transaction-trade")}
            sx={{
              marginBottom: 3,
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
            Transaction Trade
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/inventory-trade")}
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
            Inventory Trade
          </Button>
        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
