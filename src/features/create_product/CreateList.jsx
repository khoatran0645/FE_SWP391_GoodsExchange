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
import Product from "../../pages/Product";

export default function ChatList() {
  const navigate = useNavigate();
  const createProductList = [
    {
      reportingUserId: "99D274E6-FA23-4D1C-8F8A-097B3886CAAD",
      targetUserId: "0AF02748-9D43-4110-81E5-93D9ECE8CFDA",
      description: "fake",
      productId: "BDF991C7-2028-4F10-85E6-05D109008808",
    },
    {
      reportingUserId: "99D274E6-FA23-4D1C-8F8A-097B3886CAAD",
      targetUserId: "0AF02748-9D43-4110-81E5-93D9ECE8CFDA",
      description: "fake",
      productId: "BDF991C7-2028-4F10-85E6-05D109008808",
    },
    {
      reportingUserId: "99D274E6-FA23-4D1C-8F8A-097B3886CAAD",
      targetUserId: "0AF02748-9D43-4110-81E5-93D9ECE8CFDA",
      description: "fake",
      productId: "BDF991C7-2028-4F10-85E6-05D109008808",
    },
    {
      reportingUserId: "99D274E6-FA23-4D1C-8F8A-097B3886CAAD",
      targetUserId: "0AF02748-9D43-4110-81E5-93D9ECE8CFDA",
      description: "fake",
      productId: "BDF991C7-2028-4F10-85E6-05D109008808",
    },
    {
      reportingUserId: "99D274E6-FA23-4D1C-8F8A-097B3886CAAD",
      targetUserId: "0AF02748-9D43-4110-81E5-93D9ECE8CFDA",
      description: "stuff damaged",
      productId: "BDF991C7-2028-4F10-85E6-05D109008808",
    },
  ];
  return (
    <Grid container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper elevation={0} />
        <Paper />
        <Paper elevation={3} />
      </Box>
    </Grid>
  );
}
