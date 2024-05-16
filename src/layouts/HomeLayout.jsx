import { Typography, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

export default function HomeLayout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h1">Footer</Typography>
      </Grid>
    </Grid>
  );
}
