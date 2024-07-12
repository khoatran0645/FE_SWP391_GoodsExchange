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
import { South } from "@mui/icons-material";

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
  const ChangingPasswordCurrentlyUser = useStore(
    (state) => state.ChangingPasswordOfCurrentlyUser
  );
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

  // Password
  const {
    register: registerPasswordForm,
    handleSubmit: handleSubmitPasswordForm,
    watch: watchPasswordForm,
    formState: { errors: errorsPasswordForm },
  } = useForm();
  const [errors, setErrors] = useState([]);
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const onSubmitPassword = async (data) => {
    try {
      const responses = await ChangingPasswordCurrentlyUser(data);
      toast.success("Password changed successfully");
      handleClose();
    } catch (errors) {
      if (errors.response && errors.response.status === 400) {
        // Extract and set errors
        // setErrors(error.response.data.errors.NewPassword || []);
        toast.error("Password change failed. Please check the errors.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }

    console.log(data);
  };

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
      toast.success("Profile updated successfully"); // Log success message
    } catch (error) {
      toast.error("Error updating profile: "); // Log error message
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
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10,11}$/,
                message: "Phone number must be 10 or 11 digits",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
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
              maxWidth: "400px",
              alignItems: "center",
              justifyContent: "center",
              margin: "30px auto",
              width: "100%",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitPasswordForm(onSubmitPassword)}
          >
            <TextField
              required
              id="current-password"
              label="Current Password"
              fullWidth
              type="password"
              {...registerPasswordForm("oldPassword", {
                required: "Old password is required",
              })}
              sx={{ margin: "10px 0" }}
            />
            {errorsPasswordForm.oldPassword && (
              <span style={{ color: "red" }}>
                {errorsPasswordForm.oldPassword.message}
              </span>
            )}
            <TextField
              required
              id="new-password"
              label="New Password"
              fullWidth
              type="password"
              {...registerPasswordForm("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "New password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "New Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
              sx={{ margin: "10px 0" }}
            />

            {errorsPasswordForm.newPassword && (
              <span style={{ color: "red" }}>
                {errorsPasswordForm.newPassword.message}
              </span>
            )}
            <TextField
              required
              id="new-password-confirm"
              label="Confirm New Password"
              fullWidth
              type="password"
              {...registerPasswordForm("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watchPasswordForm("newPassword") ||
                  "The passwords do not match",
              })}
              sx={{ margin: "10px 0" }}
            />
            {errorsPasswordForm.confirmNewPassword && (
              <span
                style={{ color: "red", fontSize: "14px", textAlign: "left" }}
              >
                {errorsPasswordForm.confirmNewPassword.message}
              </span>
            )}
            <Button
              variant="contained"
              color="error"
              type="submit"
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Profile;
