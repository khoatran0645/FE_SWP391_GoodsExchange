import { Outlet } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Profile from "../pages/Profile";
export default function ProfileLayout() {
  return (
    <Grid container>
        <Profile />
    </Grid>
  );
}
