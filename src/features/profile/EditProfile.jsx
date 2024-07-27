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
  FormHelperText,
} from "@mui/material";
import NavBar from "../common/NavBar";
import useStore from "../../app/store";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ProfileLayout from "./ProfileLayout";

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
  const updateProfileUser = useStore((state) => state.updateProfileUser);
  const changingPasswordCurrentlyUser = useStore(
    (state) => state.changingPasswordOfCurrentlyUser
  );
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  const profileDetail = useStore((state) => state.userProfile);

  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");

  const menuItems = [{ text: "Thông tin cá nhân", key: "Thông tin cá nhân" }];

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Firstname: profileDetail?.firstName || "",
      Lastname: profileDetail?.lastName || "",
      phoneNumber: profileDetail?.phoneNumber || "",
      email: profileDetail?.email || "",
      dateOfBirth: profileDetail?.dateOfBirth
        ? dayjs(profileDetail.dateOfBirth)
        : null,
    },
  });

  const {
    register: registerPasswordForm,
    handleSubmit: handleSubmitPasswordForm,
    watch: watchPasswordForm,
    formState: { errors: errorsPasswordForm },
  } = useForm();

  const onSubmitPassword = async (data) => {
    try {
      await changingPasswordCurrentlyUser(data);
      toast.success("Password changed successfully");
      handleClose();
    } catch (errors) {
      if (errors.response && errors.response.status === 400) {
        toast.error("Password change failed. Please check the errors.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
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

    try {
      await updateProfileUser(formattedData);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Error updating profile. Please check the errors.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const handleOpen = () => setOpenResetPasswordModal(true);
  const handleClose = () => setOpenResetPasswordModal(false);

  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ width: "250px", borderRight: "1px solid #ddd" }}>
          {/* <List component="nav">
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
          </List> */}
          <ProfileLayout />
        </Box>
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
            id="firstname"
            label="First Name"
            {...register("Firstname", {
              required: "First name is required",
              maxLength: {
                value: 50,
                message: "First Name cannot exceed 50 characters",
              },
            })}
            error={!!errors.Firstname}
          />
          {errors.Firstname && (
            <span style={{ color: "red" }}>{errors.Firstname.message}</span>
          )}
          <TextField
            required
            id="lastname"
            label="Last Name"
            {...register("Lastname", {
              required: "Last name is required",
              maxLength: {
                value: 50,
                message: "Last Name cannot exceed 50 characters",
              },
            })}
            error={!!errors.Lastname}
          />
          {errors.Lastname && (
            <span style={{ color: "red" }}>{errors.Lastname.message}</span>
          )}
          <TextField
            required
            id="phone"
            label="Phone Number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^0[0-9]{9}$/,
                message: "Phone number must be 10  digits and start with 0",
              },
            })}
            error={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <span style={{ color: "red" }}>{errors.phoneNumber.message}</span>
          )}
          <TextField
            id="email"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/,
                message: "Email domain must be gmail.com or fpt.edu.vn",
              },
            })}
            error={!!errors.email}
            InputProps={{
              readOnly: true,
            }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={
                profileDetail?.dateOfBirth
                  ? dayjs(profileDetail.dateOfBirth)
                  : null
              }
              rules={{
                required: "Date of birth is required",
                validate: (value) =>
                  dayjs(value).isBefore(dayjs()) ||
                  "Date of birth cannot be in the future",
              }}
              render={({ field }) => (
                <>
                  <DatePicker
                    label="Date of Birth"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} error={!!errors.dateOfBirth} />
                    )}
                  />
                  {errors.dateOfBirth && (
                    <span style={{ color: "red" }}>
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </>
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
              "& .MuiTextField-root": { m: 1, width: "100%" },
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
              error={!!errorsPasswordForm.oldPassword}
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
              error={!!errorsPasswordForm.newPassword}
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
              error={!!errorsPasswordForm.confirmNewPassword}
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
