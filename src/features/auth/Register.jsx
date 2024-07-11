import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import useStore from "../../app/store";

export default function Register() {
  const navigate = useNavigate();
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

  const { postRegister, isLoading, error } = useStore((state) => ({
    postRegister: state.postRegister,
    isLoading: state.isLoading,
    error: state.error,
  }));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid Email Address.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/,
        "Email domain must be gmail.com or fpt.edu.vn."
      ),
    userName: Yup.string().required("Username is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be between 6 and 100 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and Confirm Password do not match."
      ),
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    phoneNumber: Yup.string()
      .required("Phone Number is required.")
      .matches(/^\d{10,11}$/, "Phone Number must be 10 or 11 digits."),
    dateOfBirth: Yup.date().required("Date of Birth is required."),
  });

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
    onSubmit: async (values) => {
      if (currentStep === 2) {
        const formDataToSend = new FormData();
        Object.keys(values).forEach((key) => {
          formDataToSend.append(key, values[key]);
        });
        formDataToSend.append(
          "userImageUrl",
          values.userImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/fir-project-31c70.appspot.com/o/Images%2F1b789a16-21bb-43b2-8b45-c7ab29a98fe2_user_avatar_def.jfif?alt=media&token=df7abe8e-a87a-4894-a6b3-8a5d2775d7e1" // Use a default image URL if not provided
        );

        setLoading(true);

        try {
          const response = await postRegister(formDataToSend);
          console.log(response);

          setTimeout(() => {
            setLoading(false);
            setShowConfirmationMessage(true);
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          }, 0);
        } catch (error) {
          console.error("Error registering:", error);
          setLoading(false);
        }
      }
    },
  });

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const googleLoginSuccess = (response) => {
    console.log("Google login successful", response.profileObj.email);
  };

  const googleLoginError = (error) => {
    console.log("Google login error", error);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleEmailConfirmation = () => {
    navigate("/login");
  };

  return (
    <Box component="form" sx={formStyle} onSubmit={formik.handleSubmit}>
      {!showConfirmationMessage && (
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
      )}

      {currentStep === 1 && (
        <>
          <GoogleLogin
            text="signup_with"
            onSuccess={googleLoginSuccess}
            onError={googleLoginError}
            logo_alignment="center"
            locale="en_US"
          />
          <Typography
            sx={{
              margin: "10px 0",
              alignSelf: "center",
              fontSize: "14px",
            }}
            variant="caption"
          >
            Or
          </Typography>
          <FormControl
            sx={{ margin: "0 0 10px 0" }}
            size="small"
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            <InputLabel htmlFor="outlined-email">Email</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-email"
              type="text"
              label="Email"
              {...formik.getFieldProps("email")}
            />
            <FormHelperText>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0 10px 0" }}
            size="small"
            variant="outlined"
            error={formik.touched.userName && Boolean(formik.errors.userName)}
          >
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-username"
              type="text"
              label="Username"
              {...formik.getFieldProps("userName")}
            />
            <FormHelperText>
              {formik.touched.userName && formik.errors.userName}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0" }}
            size="small"
            variant="outlined"
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
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
              {...formik.getFieldProps("password")}
            />
            <FormHelperText>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0" }}
            size="small"
            variant="outlined"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            <FormHelperText>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Button
            type="button"
            variant="contained"
            sx={{
              marginBottom: "10px",
              backgroundColor: "#FF204E",
              "&:hover": {
                backgroundColor: "#FF204E",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </>
      )}

      {currentStep === 2 && (
        <>
          <FormControl
            sx={{ margin: "0 0 10px 0" }}
            size="small"
            variant="outlined"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          >
            <InputLabel htmlFor="outlined-firstName">First Name</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-firstName"
              type="text"
              label="First Name"
              {...formik.getFieldProps("firstName")}
            />
            <FormHelperText>
              {formik.touched.firstName && formik.errors.firstName}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0 10px 0" }}
            size="small"
            variant="outlined"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          >
            <InputLabel htmlFor="outlined-lastName">Last Name</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-lastName"
              type="text"
              label="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            <FormHelperText>
              {formik.touched.lastName && formik.errors.lastName}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0 10px 0" }}
            size="small"
            variant="outlined"
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
          >
            <InputLabel htmlFor="outlined-phoneNumber">Phone Number</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-phoneNumber"
              type="text"
              label="Phone Number"
              {...formik.getFieldProps("phoneNumber")}
            />
            <FormHelperText>
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ margin: "10px 0 10px 0" }}
            size="small"
            variant="outlined"
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
          >
            <InputLabel htmlFor="outlined-dateOfBirth">
              Date of Birth
            </InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-dateOfBirth"
              type="date"
              label="Date of Birth"
              {...formik.getFieldProps("dateOfBirth")}
            />
            <FormHelperText>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: "10px",
              backgroundColor: "#FF204E",
              "&:hover": {
                backgroundColor: "#FF204E",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </>
      )}

      {showConfirmationMessage && (
        <Typography sx={{ alignSelf: "center" }} variant="body1" gutterBottom>
          Registration Successful. Please check your email for confirmation.
        </Typography>
      )}
    </Box>
  );
}
