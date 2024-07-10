import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { NavLink } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import useStore from "../../app/store";

export default function Register() {
  const { postRegister, isLoading, error } = useStore((state) => ({
    postRegister: state.postRegister,
    isLoading: state.isLoading,
    error: state.error,
  }));

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const formStyle = {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #000000",
    borderRadius: "7px",
    padding: "50px 100px",
    boxShadow: "3px 7px 5px 0px #000000",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (data) => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      try {
        const response = await postRegister({
          ...data,
          userImageUrl:
            data.userImageUrl || "https://example.com/default-image.jpg",
        });
        console.log(response);

        if (response?.isSuccessed) {
          console.log("Registration successful:", response);
          // Handle success (e.g., navigate to login or another page)
        } else {
          console.error(response?.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyle}>
      <Typography
        sx={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="h5"
        gutterBottom
      >
        {currentStep === 2 && (
          <IconButton
            onClick={handleBack}
            sx={{
              marginRight: "1px",
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        Register your Account
      </Typography>
      {currentStep === 1 && (
        <>
          <FormControl
            sx={{
              margin: "0 0 10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-email"
                  type="email"
                  label="Email"
                  error={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0 10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-username"
                  type="text"
                  label="Username"
                  error={!!errors.userName}
                />
              )}
            />
            {errors.userName && (
              <FormHelperText error>{errors.userName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <Controller
              name="confirm_password"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  error={!!errors.confirm_password}
                />
              )}
            />
            {errors.confirm_password && (
              <FormHelperText error>
                {errors.confirm_password.message}
              </FormHelperText>
            )}
          </FormControl>
        </>
      )}
      {currentStep === 2 && (
        <>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-first-name">First Name</InputLabel>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-first-name"
                  type="text"
                  label="First Name"
                  error={!!errors.firstName}
                />
              )}
            />
            {errors.firstName && (
              <FormHelperText error>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-last-name">Last Name</InputLabel>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-last-name"
                  type="text"
                  label="Last Name"
                  error={!!errors.lastName}
                />
              )}
            />
            {errors.lastName && (
              <FormHelperText error>{errors.lastName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-phone-number">
              Phone Number
            </InputLabel>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "Phone Number is required",
                validate: value => {
                  if (!/^\d+$/.test(value)) {
                    return "Phone Number must be numeric";
                  }
                  if (value.length < 10 || value.length > 11) {
                    return "Phone Number must be 10-11 digits long";
                  }
                  if (Number(value) <= 0) {
                    return "Phone Number must be a positive number";
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-phone-number"
                  type="text"
                  label="Phone Number"
                  error={!!errors.phoneNumber}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormHelperText error>
                {errors.phoneNumber.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-date-of-birth">
              Date of Birth
            </InputLabel>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue=""
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  size="small"
                  id="outlined-date-of-birth"
                  type="date"
                  label="Date of Birth"
                  error={!!errors.dateOfBirth}
                />
              )}
            />
            {errors.dateOfBirth && (
              <FormHelperText error>
                {errors.dateOfBirth.message}
              </FormHelperText>
            )}
          </FormControl>
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoading}
        sx={{
          marginTop: "20px",
        }}
      >
        {currentStep === 1 ? "Next" : "Register"}
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
