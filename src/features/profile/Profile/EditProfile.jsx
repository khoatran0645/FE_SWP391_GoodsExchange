import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Modal } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useStore from "../../../app/store";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

function EditProfile() {
  const getProfileUserById = useStore((state) => state.getProfileUserById);
  const updateProfileUser = useStore((state) => state.updateProfileUser);
  const changingPasswordCurrentlyUser = useStore(
    (state) => state.changingPasswordOfCurrentlyUser
  );
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);
  const navigate = useNavigate();

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, []);

  const profileDetail = useStore((state) => state.userProfile);

  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "45ch" },
            display: "flex",
            flexDirection: "column",
            maxWidth: "600px",
            maxHeight: "600px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Button
              onClick={() => navigate(-1)}
              sx={{
                color: "black",
                mr: "6rem",
                display: "flex",
                float: "left",
              }}
            >
              <ArrowBack />
            </Button>
            <Typography variant="h4" fontFamily={"fantasy"}>
              User Information
            </Typography>
          </Box>
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
                message: "Phone number must be 10 digits and start with 0",
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
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              color="error"
              sx={{
                width: "10rem",
                fontSize: "0.8rem",
                backgroundColor: "#FF204E",
                color: "white",
                "&:hover": {
                  backgroundColor: "#FF204E",
                },
              }}
            >
              Change Password
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{
                width: "5rem",
                fontSize: "0.8rem",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Save
            </Button>
          </Box>
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
            Change Password
          </Typography>
          <form onSubmit={handleSubmitPasswordForm(onSubmitPassword)}>
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              type="password"
              {...registerPasswordForm("currentPassword", {
                required: "Current password is required",
              })}
              error={!!errorsPasswordForm.currentPassword}
              helperText={errorsPasswordForm.currentPassword?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              {...registerPasswordForm("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={!!errorsPasswordForm.newPassword}
              helperText={errorsPasswordForm.newPassword?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm New Password"
              type="password"
              {...registerPasswordForm("confirmPassword", {
                validate: (value) =>
                  value === watchPasswordForm("newPassword") ||
                  "Passwords do not match",
              })}
              error={!!errorsPasswordForm.confirmPassword}
              helperText={errorsPasswordForm.confirmPassword?.message}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                onClick={handleClose}
                sx={{
                  border: "1px solid black",
                  // backgroundColor: "black",
                  color: "black",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginRight: 1,
                  backgroundColor: "#FF204E",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#FF204E",
                  },
                }}
              >
                Change Password
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default EditProfile;
