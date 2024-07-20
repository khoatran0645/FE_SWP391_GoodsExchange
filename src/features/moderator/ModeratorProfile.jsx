import React, { useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function ModeratorProfile() {
  const getProfileUserById = useStore((state) => state.getProfileUserById);
  const UpdateProfileUser = useStore((state) => state.UpdateProfileUser);
  const userInfo = useStore.getState().userInfo;
  const userDetail = jwtDecode(userInfo.data.token);

  useEffect(() => {
    getProfileUserById(userDetail.id);
  }, [getProfileUserById, userDetail.id]);

  const profileDetail = useStore((state) => state.userProfile);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (profileDetail) {
      reset({
        Firstname: profileDetail.firstName,
        Lastname: profileDetail.lastName,
        phoneNumber: profileDetail.phoneNumber,
        email: profileDetail.email,
        dateOfBirth: dayjs(profileDetail.dateOfBirth),
      });
    }
  }, [profileDetail, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth).toISOString() : null,
    };
    console.log("Formatted Data: ", formattedData);

    try {
      await UpdateProfileUser(formattedData);
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
          marginTop: "100px",
          width: "70%",
          flexFlow: "column",
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
                onChange={(newValue) => setValue("dateOfBirth", newValue)}
                renderInput={(params) => (
                  <TextField {...params} {...register("dateOfBirth")} />
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
