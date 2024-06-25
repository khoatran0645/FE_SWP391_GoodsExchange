import React from "react";
import {
  Avatar,
  Paper,
  Grid,
  Button,
  Typography,
  Badge,
  IconButton,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect } from "react";

import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
const Profile = () => {
   const navigate = useNavigate();
  const data = [
    {
      lastName: "Phuong",
      firstName: "Thao",
      phone: 88888888,
      image:
        "https://i.pinimg.com/originals/94/ba/f3/94baf36bb56658bfe8dfba142e4a98a3.jpg",
    },
  ];
  const [in4List, setIn4List] = React.useState(data);

  return (
    <>
      <NavBar />

      <Grid container spacing={2} padding={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              textAlign: "center",
              position: "relative",
              bgcolor: "#fafafa",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton
                    sx={{
                      bgcolor: "white",
                      border: "1px solid #e0e0e0",
                      padding: "2px",
                    }}
                  ></IconButton>
                }
              >
                <Avatar
                  alt="Psyduck"
                  src="https://i.pinimg.com/originals/94/ba/f3/94baf36bb56658bfe8dfba142e4a98a3.jpg"
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Box>
            {in4List.map((in4) => (
              <>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {in4.lastName} {in4.firstName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Phone: {in4.phone}
                </Typography>
              </>
            ))}
            <Typography variant="body2" color="textSecondary">
              Chưa có đánh giá
            </Typography>

            <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/edit-profile')}>
              Chỉnh sửa trang cá nhân
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Phản hồi chat: Chưa có thông tin
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Đã tham gia: 1 ngày
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Tabs value={0} textColor="secondary" indicatorColor="secondary">
              <Tab label="Đang hiển thị (0)" />
              <Tab label="Đã bán (0)" />
            </Tabs>
            <Box sx={{ textAlign: "center", marginTop: 5 }}>
              <Typography variant="h6">Bạn chưa có tin đăng nào</Typography>
              <Button variant="contained" color="warning" sx={{ marginTop: 2 }}>
                ĐĂNG TIN NGAY
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;