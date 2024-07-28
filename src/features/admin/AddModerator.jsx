import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import useStore from "../../app/store";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Invalid Email Address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/,
      "Email domain must be gmail.com or fpt.edu.vn."
    )
    .required("Email is required."),
  dateOfBirth: yup
    .date()
    .max(new Date(), "Date of Birth cannot be in the future.")
    .required("Date of Birth is required."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "Phone Number must be 10 or 11 digits.")
    .required("Phone Number is required."),
  userName: yup.string().required("Username is required."),
  password: yup
    .string()
    .min(6, "Password must be between 6 and 100 characters.")
    .max(100, "Password must be between 6 and 100 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
});

export default function AddModerator({ onAdd }) {
  const [open, setOpen] = useState(false);
  const postCreateModeratorAccount = useStore(
    (state) => state.postCreateModeratorAccount
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
      userImageUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("email", values.email);
        formDataToSend.append("userName", values.userName);
        formDataToSend.append("firstName", values.firstName);
        formDataToSend.append("lastName", values.lastName);
        formDataToSend.append("phoneNumber", values.phoneNumber);
        formDataToSend.append("dateOfBirth", values.dateOfBirth);
        formDataToSend.append(
          "userImageUrl",
          values.userImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/fir-project-31c70.appspot.com/o/Images%2F1b789a16-21bb-43b2-8b45-c7ab29a98fe2_user_avatar_def.jfif?alt=media&token=df7abe8e-a87a-4894-a6b3-8a5d2775d7e1"
        );
        formDataToSend.append("password", values.password);
        formDataToSend.append("confirmPassword", values.confirmPassword);

        const response = await postCreateModeratorAccount(formDataToSend);
        console.log(response);
        toast.success("Create moderator account successfully!");
        setOpen(false);
        resetForm();
        onAdd();
      } catch (error) {
        console.error("Error registering:", error);
        alert("Error creating moderator: " + error.message);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="large"
        onClick={handleClickOpen}
        sx={{
          float: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          color: "white",
          backgroundColor: "#1876D2",
          marginBottom: "16px",
          backgroundColor: "#FF204E",
          "&:hover": {
            backgroundColor: "#FF204E",
          },
        }}
      >
        Create User Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add Moderator Account</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
              margin="normal"
              required
              InputProps={{
                inputProps: { max: new Date().toISOString().split("T")[0] },
              }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              margin="normal"
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="normal"
              required
            />
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "#FF204E",
                  "&:hover": {
                    backgroundColor: "#FF204E",
                  },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
