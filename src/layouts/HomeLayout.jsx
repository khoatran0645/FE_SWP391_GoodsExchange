import { Typography, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import StickyFooter from "../pages/Footer";

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
        <StickyFooter />
      </Grid>
    </Grid>
  );
}
