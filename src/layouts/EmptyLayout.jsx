import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
export default function EmptyLayout() {
  return (
    <Grid container>
      <Outlet />
    </Grid>
  );
}
