import { useEffect, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
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
  const [showPasswordCollapse, setShowPasswordCollapse] = useState(false);
  const [showConfirmPasswordCollapse, setShowConfirmPasswordCollapse] =
    useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    userImageUrl: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  useEffect(() => {
    const isShowPassword = formData.password.length > 0;
    const isShowConfirmPassword = formData.confirmPassword.length > 0;
    const passwordMatch = formData.password === formData.confirmPassword;
    setShowPasswordCollapse(isShowPassword);
    setShowConfirmPasswordCollapse(isShowConfirmPassword);
    setIsPasswordMatch(passwordMatch);
  }, [formData]);

  const googleLoginSuccess = (response) => {
    console.log("Google login successful", response.profileObj.email);
  };

  const googleLoginError = (error) => {
    console.log("Google login error", error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      const {
        email,
        userName,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        userImageUrl,
        password,
        confirmPassword,
      } = formData;

      setLoading(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("email", email);
        formDataToSend.append("userName", userName);
        formDataToSend.append("firstName", firstName);
        formDataToSend.append("lastName", lastName);
        formDataToSend.append("phoneNumber", phoneNumber);
        formDataToSend.append("dateOfBirth", dateOfBirth);
        formDataToSend.append(
          "userImageUrl",
          userImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/fir-project-31c70.appspot.com/o/Images%2F1b789a16-21bb-43b2-8b45-c7ab29a98fe2_user_avatar_def.jfif?alt=media&token=df7abe8e-a87a-4894-a6b3-8a5d2775d7e1" // Use a default image URL if not provided
        );
        formDataToSend.append("password", password);
        formDataToSend.append("confirmPassword", confirmPassword);

        console.log(formDataToSend);

        const response = await postRegister(formDataToSend);
        console.log(response);

        setTimeout(() => {
          setLoading(false);
          setShowConfirmationMessage(true);
        }, 1000);
      } catch (error) {
        console.error("Error registering:", error);
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleEmailConfirmation = () => {
    navigate("/login");
  };

  return (
    <Box onSubmit={handleSubmit} component="form" sx={formStyle}>
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
            sx={{
              margin: "0 0 10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-email">Email</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-email"
              type="text"
              label="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0 10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-username"
              type="text"
              label="Username"
              value={formData.userName}
              onChange={(e) => {
                setFormData({ ...formData, userName: e.target.value });
              }}
            />
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
            <OutlinedInput
              required
              size="small"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                showPasswordCollapse && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
              label="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel
              error={!isPasswordMatch}
              htmlFor="outlined-adornment-confirm-password"
            >
              Confirm password
            </InputLabel>
            <OutlinedInput
              error={!isPasswordMatch}
              required
              size="small"
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                showConfirmPasswordCollapse && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
              label="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
              }}
            />
            {!isPasswordMatch && (
              <FormHelperText error>Passwords do not match</FormHelperText>
            )}
          </FormControl>
        </>
      )}

      {currentStep === 2 && !showConfirmationMessage && (
        <>
          {" "}
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-first-name">First Name</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-first-name"
              type="text"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-last-name">Last Name</InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-last-name"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
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
            <OutlinedInput
              required
              size="small"
              id="outlined-phone-number"
              type="text"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
              }}
            />
          </FormControl>
          <FormControl
            sx={{
              margin: "10px 0",
            }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-date-of-birth"></InputLabel>
            <OutlinedInput
              required
              size="small"
              id="outlined-date-of-birth"
              type="date"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(e) => {
                setFormData({ ...formData, dateOfBirth: e.target.value });
              }}
            />
          </FormControl>
        </>
      )}

      {loading && (
        <CircularProgress sx={{ alignSelf: "center", margin: "20px" }} />
      )}

      {showConfirmationMessage && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="h6">
            Please confirm your registration by clicking the link sent to your
            email.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleEmailConfirmation}
          >
            Confirm
          </Button>
        </Box>
      )}

      {!loading && !showConfirmationMessage && (
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
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
