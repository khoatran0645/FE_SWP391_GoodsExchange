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
  Typography,
  Modal,
} from "@mui/material";

import NavBar from "../common/NavBar";

import useStore from "../../app/store";

import { jwtDecode } from "jwt-decode";
import { red } from "@mui/material/colors";

const resetPasswordModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Profile() {
  const getProfileUserById = useStore((state) => state.getProfileUserById);

  const userInfo = useStore.getState().userInfo;

  const userDetail = jwtDecode(userInfo.data.token);

  // const Userprofile = useState.getState().userDetails;

  console.log("userDetail : ", userDetail);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  const profileDetail = useStore((state) => state.userProfile);

  console.log("profileDetail  ", profileDetail);

  // const [formData, setFormData] = useState(profileData);

  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");

  const menuItems = [{ text: "Thông tin cá nhân", key: "Thông tin cá nhân" }];
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

  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const handleOpen = () => setOpenResetPasswordModal(true);
  const handleClose = () => setOpenResetPasswordModal(false);

  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Menu sidebar */}
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
          <TextField
            id="birthday"
            label="Ngày, tháng, năm sinh"
            type="date"
            // defaultValue={"2003-09-19"}
            value={profileDetail?.dateOfBirth}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
          >
            Lưu thay đổi
          </Button>

          <Button
            variant="contained"
            onClick={handleOpen}
            color="error"
            sx={{ mt: 2 }}
          >
            Đổi mật khẩu
          </Button>
        </Box>
      </Box>
      <Modal
        keepMounted
        open={openResetPasswordModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={resetPasswordModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đổi mật khẩu
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",

              maxWidth: "1600px",
              alignItems: "center",
              justifyContent: "center",
              margin: "30px 0",
              width: "100%",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              id="current-password"
              label="Mật khẩu hiện tại"
              fullWidth={true}
              type="password"
              sx={{
                margin: "10px 0"
              }}
            />
            <TextField
              required
              id="new-password"
              label="Mật khẩu mới"
              fullWidth={true}
              type="password"
              sx={{
                margin: "10px 0"
              }}
            />
            <TextField
              required
              id="new-password-confirm"
              label="Xác nhận mật khẩu mới"
              fullWidth={true}
              type="password"
              sx={{
                margin: "10px 0"
              }}
            />
            <Button variant="contained" color="error" sx={{ mt: 2 }}>
              Đổi mật khẩu
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

// function App() {
//   const initialProfileData = {
//     name: "Thảo Phương",

//     phone: "",

//     address: "",

//     introduction: "",

//     nickname: "",

//     email: "phuongthao0322003@gmail.com",

//     cccd: "",

//     invoiceInfo: "",

//     taxCode: "",

//     favoriteCategory: "",

//     gender: "Nữ",

//     birthday: "",
//   };

//   // const getProfileUserById = useStore((state) => state.getProfileUserById);

//   // const userInfo = useStore.getState().userInfo;

//   // const userDetail = jwtDecode(userInfo.data.token);

//   // // const Userprofile = useState.getState().userDetails;

//   // console.log("userDetail : ", userDetail.id);

//   // useEffect(() => {

//   //   getProfileUserById(userDetail.id);

//   // }, []);

//   // const profileDetail = useStore((state) => state.userDetails);

//   // console.log("profileDetail  ", profileDetail);

//   // const userDetails = useStore.getState().userDetails;

//   // console.log("userDetails", userDetails);

//   // console.log("userid", userDetail.id);

//   const [profileData, setProfileData] = useState(userDetail);

//   const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");

//   const menuItems = [
//     { text: "Thông tin cá nhân", key: "Thông tin cá nhân" },

//     { text: "Cài đặt tài khoản", key: "Cài đặt tài khoản" },
//   ];

//   const handleProfileSubmit = (newData) => {
//     setProfileData(newData);

//     setSelectedMenu("Thông tin cá nhân");
//   };

//   return (
//     <>
//       <NavBar />

//       <Box sx={{ display: "flex", height: "100vh" }}>
//         <Box sx={{ width: "250px", borderRight: "1px solid #ddd" }}>
//           <List component="nav">
//             {menuItems.map((item) => (
//               <div key={item.key}>
//                 <ListItem
//                   onClick={() => setSelectedMenu(item.key)}
//                   sx={{
//                     backgroundColor:
//                       selectedMenu === item.key
//                         ? "rgba(0, 0, 255, 0.1)"
//                         : "inherit",
//                   }}
//                 >
//                   <ListItemText primary={item.text} />
//                 </ListItem>

//                 <Divider />
//               </div>
//             ))}
//           </List>
//         </Box>

//         <Box sx={{ flex: 1, padding: "20px" }}>
//           {selectedMenu === "Thông tin cá nhân" && (
//             <Profile
//               profileData={profileData}
//               onProfileSubmit={handleProfileSubmit}
//             />
//           )}

//           {selectedMenu !== "Thông tin cá nhân" && (
//             <Box
//               sx={{
//                 display: "flex",

//                 justifyContent: "center",

//                 alignItems: "center",

//                 height: "100%",
//               }}
//             >
//               <h2>{selectedMenu}</h2>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }

export default Profile;
