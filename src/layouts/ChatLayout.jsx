import { Outlet } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
export default function ChatLayout() {
  return (
    <Grid container>
      <Typography variant="h6">Chat</Typography>
      <Outlet />
    </Grid>
  );
}
