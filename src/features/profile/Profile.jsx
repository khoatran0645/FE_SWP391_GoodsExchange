import React, { useState } from "react";
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
import NavBar from "../common/NavBar";
import useStore from "../../app/store";
import { jwtDecode } from "jwt-decode";

function Profile({ profileData, onProfileSubmit }) {
  const [formData, setFormData] = useState(profileData);

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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "45ch" },
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "auto",
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
        defaultValue="Thảo Phương"
        onSubmit={handleSubmit}
      />
      <TextField required id="phone" value={formData.mobilephone} label="Thêm số điện thoại" />
      <TextField id="address" label="Địa chỉ" />
      <TextField
        id="email"
        label="Email"
        value={formData.emailaddress}
        InputProps={{
          readOnly: true,
        }}
      />
      {/* <TextField id="cccd" label="CCCD / CMND / Hộ chiếu" />
      <TextField id="invoice-info" label="Thông tin xuất hoá đơn" />
      <TextField id="tax-code" label="Mã số thuế" /> */}
      {/* <TextField id="favorite-category" label="Danh mục yêu thích" /> */}
      <TextField id="gender" select label="Giới tính" defaultValue="Nữ">
        <MenuItem value="Nữ">Nữ</MenuItem>
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Khác">Khác</MenuItem>
      </TextField>
      <TextField
        id="birthday"
        label="Ngày, tháng, năm sinh"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Lưu thay đổi
      </Button>
    </Box>
  );
}

function App() {
  const initialProfileData = {
    name: "Thảo Phương",
    phone: "",
    address: "",
    introduction: "",
    nickname: "",
    email: "phuongthao0322003@gmail.com",
    cccd: "",
    invoiceInfo: "",
    taxCode: "",
    favoriteCategory: "",
    gender: "Nữ",
    birthday: "",
  };

  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  const [profileData, setProfileData] = useState(userDetail);
  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");
  const menuItems = [
    { text: "Thông tin cá nhân", key: "Thông tin cá nhân" },
    { text: "Cài đặt tài khoản", key: "Cài đặt tài khoản" },
  ];
  const handleProfileSubmit = (newData) => {
    setProfileData(newData);
    setSelectedMenu("Thông tin cá nhân");
  };
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ width: "250px", borderRight: "1px solid #ddd" }}>
          <List component="nav">
            {menuItems.map((item) => (
              <div key={item.key}>
                <ListItem
                  onClick={() => setSelectedMenu(item.key)}
                  sx={{
                    backgroundColor:
                      selectedMenu === item.key
                        ? "rgba(0, 0, 255, 0.1)"
                        : "inherit",
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, padding: "20px" }}>
          {selectedMenu === "Thông tin cá nhân" && (
            <Profile
              profileData={profileData}
              onProfileSubmit={handleProfileSubmit}
            />
          )}
          {selectedMenu !== "Thông tin cá nhân" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h2>{selectedMenu}</h2>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
