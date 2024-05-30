import {
  Grid,
  List,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();
  const chatList = [
    {
      id: 1,
      name: "Khoa",
      lastMessage:
        "Hi, I received my order today, but one of the items is damaged. What should I do?",
      avtImg: "avtImg",
      lastMessageTime: "10m ago",
    },
    {
      id: 2,
      name: "Thanh",
      lastMessage: "You're welcome! Have a great day",
      avtImg: "avtImg",
      lastMessageTime: "10m ago",
    },
    {
      id: 3,
      name: "Giang",
      lastMessage:
        "I’ll be focusing on the development side, specifically backend systems.",
      avtImg: "avtImg",
      lastMessageTime: "10m ago",
    },
    {
      id: 4,
      name: "Trieu",
      lastMessage: "Great! Looking forward to it!",
      avtImg: "avtImg",
      lastMessageTime: "10m ago",
    },
    {
      id: 5,
      name: "Thao",
      lastMessage:
        "Good evening! Are you ready to order, or do you need a few more minutes?",
      avtImg: "avtImg",
      lastMessageTime: "lastMessageTime",
    },
    {
      id: 6,
      name: "Vy",
      lastMessage: "You’re welcome. Enjoy your meal!",
      avtImg: "avtImg",
      lastMessageTime: "lastMessageTime",
    },
  ];
  return (
    <Grid container>
      <Typography variant="h6">Chat list</Typography>
      <List>
        {chatList.map((chat) => (
          <ListItemButton key={chat.id} onClick={() => {navigate(`/chat/${chat.id}`) }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={chat.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name + " - " + chat.lastMessageTime}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chat.lastMessage}
                  </Typography>
                }
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
}
