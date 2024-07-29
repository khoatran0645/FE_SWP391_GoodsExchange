import React, { useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function ModeratorProfile() {
  const getProfileUserById = useStore((state) => state.getProfileUserById);
  const updateProfileUser = useStore((state) => state.updateProfileUser);
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, [getProfileUserById, userDetail.id]);

  const profileDetail = useStore((state) => state.userProfile);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profileDetail?.firstName,
      lastName: profileDetail?.lastName,
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
  }, [profileDetail]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth).toISOString()
        : null,
    };
    console.log("Formatted Data: ", formattedData);

    try {
      await updateProfileUser(formattedData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "120px",
          width: "70%",
          flexFlow: "column",
          marginLeft: "300px",
        }}
      >
        <ModeratorPage />
        <Box sx={{ display: "flex", height: "100vh" }}>
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
            <h2>Information</h2>
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
            <Button />
          </Box>
        </Box>
      </Box>
    </>
  );
}
