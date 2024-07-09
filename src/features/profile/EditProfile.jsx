import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Modal,
} from "@mui/material";
import NavBar from "../common/NavBar";
import useStore from "../../app/store";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; // Import <dayjs></dayjs>
import { toast } from "react-toastify";

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
  const UpdateProfileUser = useStore((state) => state.UpdateProfileUser);
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  const profileDetail = useStore((state) => state.userProfile);

  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");

  const menuItems = [{ text: "Thông tin cá nhân", key: "Thông tin cá nhân" }];

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      Firstname: profileDetail?.firstName,
      Lastname: profileDetail?.lastName,
      phoneNumber: profileDetail?.phoneNumber,
      email: profileDetail?.email,
      dateOfBirth: profileDetail?.dateOfBirth
        ? dayjs(profileDetail.dateOfBirth)
        : null,
    },
  });

  useEffect(() => {
    if (profileDetail) {
      setValue("Firstname", profileDetail.firstName);
      setValue("Lastname", profileDetail.lastName);
      setValue("phoneNumber", profileDetail.phoneNumber);
      setValue("email", profileDetail.email);
      setValue("dateOfBirth", dayjs(profileDetail.dateOfBirth));
    }
  }, [profileDetail, setValue]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth).toISOString()
        : null,
    };
    console.log("Formatted Data: ", formattedData); // Log the data before the API call

    try {
      await UpdateProfileUser(formattedData);
      toast("Profile updated successfully"); // Log success message
    } catch (error) {
      console.error("Error updating profile: ", error); // Log error message
    }
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>Thông tin cá nhân</h2>
          <TextField
            required
            id="name"
            label="FirstName"
            {...register("Firstname")}
          />
          <TextField
            required
            id="name"
            label="LastName"
            {...register("Lastname")}
          />
          <TextField
            required
            id="phone"
            label="Thêm số điện thoại"
            {...register("phoneNumber")}
          />
          <TextField
            id="email"
            label="Email"
            {...register("email")}
            InputProps={{
              readOnly: true,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày sinh"
              value={dayjs(profileDetail?.dateOfBirth)}
              onChange={(newValue) => setValue("birthday", newValue)}
              renderInput={(params) => (
                <TextField {...params} {...register("birthday")} />
              )}
            />
          </LocalizationProvider>
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              required
              id="current-password"
              label="Mật khẩu hiện tại"
              fullWidth={true}
              type="password"
              sx={{ margin: "10px 0" }}
            />
            <TextField
              required
              id="new-password"
              label="Mật khẩu mới"
              fullWidth={true}
              type="password"
              sx={{ margin: "10px 0" }}
            />
            <TextField
              required
              id="new-password-confirm"
              label="Xác nhận mật khẩu mới"
              fullWidth={true}
              type="password"
              sx={{ margin: "10px 0" }}
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

export default Profile;
