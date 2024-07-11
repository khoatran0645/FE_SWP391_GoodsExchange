import React, { useState } from "react";
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
import { jwtDecode } from "jwt-decode";

import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import CreateNewProduct from "../products/CreateNewProduct";
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
  const getProfileUserById = useStore((state) => state.getProfileUserById);
  const [in4List, setIn4List] = useState(data);
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  const profileDetail = useStore((state) => state.userProfile);

  console.log(profileDetail);

  return (
    <>
      <NavBar />

      <Grid container justifyContent="flex-end">
        <Grid item>
          <CreateNewProduct />
        </Grid>
      </Grid>

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
                  alt={profileDetail.lastName}
                  src={profileDetail?.userImageUrl}
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Box>
            {in4List.map((in4) => (
              <>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {profileDetail.lastName} {profileDetail.firstName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Phone: {profileDetail.phoneNumber}
                </Typography>
              </>
            ))}
            <Typography variant="body2" color="textSecondary">
              Chưa có đánh giá
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate("/edit-profile")}
            >
              Chỉnh sửa trang cá nhân
            </Button>
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
