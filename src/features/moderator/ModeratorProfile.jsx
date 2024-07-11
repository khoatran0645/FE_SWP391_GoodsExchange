import React, { useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";

import { jwtDecode } from "jwt-decode";

export default function ModeratorProfile() {
  const getProfileUserById = useStore((state) => state.getProfileUserById);

  const userInfo = useStore.getState().userInfo;

  const userDetail = jwtDecode(userInfo.data.token);

  // const Userprofile = useState.getState().userDetails;

  console.log("userDetail : ", userDetail);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  let profileDetail = useStore((state) => state.userProfile);
  // khong lay T ve sau
  // profileDetail.dateOfBirth = profileDetail?.dateOfBirth.split('T')[0]

  console.log("profileDetail  ", profileDetail);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    onProfileSubmit(formData);
  };
  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          width: "70%",
          flexFlow: "column",
        }}
      >
        <ModeratorPage />
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* form  */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45ch" },

              display: "flex",

              flexDirection: "column",

              maxWidth: "600px",
              maxHeight: "600px",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 100px",

              padding: "20px",

              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",

              borderRadius: "8px",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h2>Thông tin cá nhân</h2>

            <TextField
              required
              id="name"
              label="Họ và tên"
              // defaultValue="Thảo Phương"
              value={profileDetail?.fullName}
              onSubmit={handleSubmit}
            />

            <TextField
              required
              id="phone"
              value={profileDetail?.phoneNumber}
              label="Thêm số điện thoại"
            />

            <TextField
              id="email"
              label="Email"
              value={profileDetail?.email}
              InputProps={{
                readOnly: true,
              }}
            />
            {/* <TextField
              id="birthday"
              label="Ngày, tháng, năm sinh"
              type="date"
              // defaultValue={"2003-09-19"}
              value={profileDetail?.dateOfBirth}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Lưu thay đổi
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
