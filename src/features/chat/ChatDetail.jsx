import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ChatMessage from "./ChatMessage";
export default function ChatDetail() {
  let location = useLocation();
  // console.log("location", location.pathname);
  return (
    <Grid container>
      <Typography variant="h6">ChatDetail {location.pathname} </Typography>
      <ChatMessage
        data={{
          message: { sender: "Khoa", text: "Hi", timestamp: "10m ago" },
          isSender: true,
        }}
      />
      <ChatMessage
        message={{
          message: { sender: "Linh", text: "Hello", timestamp: "9m ago" },
          isSender: false,
        }}
      />
      <ChatMessage
        message={{
          message: { sender: "Khoa", text: "How are you?", timestamp: "8 ago" },
          isSender: true,
        }}
      />
      <ChatMessage
        message={{
          message: {
            sender: "Khoa",
            text: "I'm fine. Thank you",
            timestamp: "7m ago",
          },
          isSender: false,
        }}
      />
    </Grid>
  );
}
