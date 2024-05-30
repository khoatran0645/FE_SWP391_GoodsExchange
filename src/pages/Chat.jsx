import { Grid, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import ChatList from "../features/chat/ChatList";
export default function Chat() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <ChatList />
      </Grid>
      <Grid item xs={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
