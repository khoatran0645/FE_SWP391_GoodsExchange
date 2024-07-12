import { useState, useRef } from "react";
import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { GoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";

import useStore from "../../app/store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Login() {
  const postLogin = useStore((state) => state.postLogin);
  const setAuth = useStore((state) => state.setAuth);
  const navigate = useNavigate();

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const formStyle = {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    border: "1px solid #000000",
    padding: "50px 100px",
    borderRadius: "7px",
    boxShadow: "3px 7px 5px 0px #000000",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formDataRef = useRef({
    username: "",
    password: "",
    rememberme: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    formDataRef.current[name] = type === "checkbox" ? checked : value;
  };

  const onLoginClick = async (e) => {
    e.preventDefault();
    const { username, password, rememberme } = formDataRef.current;
    if (!username || !password) {
      toast.error("Please enter your username and password");
      return;
    }
    await postLogin({ username, password, rememberme });
    const userInfo = useStore.getState().userInfo;
    console.log("userInfo", userInfo);

    if (userInfo) {
      sessionStorage.setItem("token", userInfo.data.token);
      const decoded = jwtDecode(userInfo.data.token);
      console.log(decoded);
      setAuth(true);
      if (userInfo.data.role.includes("Moderator")) {
        navigate("/manage-products");
      } else if (userInfo.data.role.includes("Administrator")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Box sx={formStyle}>
      <Typography
        sx={{
          marginBottom: "20px",
        }}
        variant="h5"
        gutterBottom
      >
        Login to your Account
      </Typography>
      <GoogleLogin
        logo_alignment="center"
        onSuccess={responseMessage}
        onError={errorMessage}
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
          marginBottom: "10px",
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-username">Username</InputLabel>
        <OutlinedInput
          id="outlined-username"
          name="username"
          label="Username"
          onChange={handleChange}
          defaultValue={formDataRef.current.username}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          name="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={handleChange}
          defaultValue={formDataRef.current.password}
        />
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            name="rememberme"
            onChange={handleChange}
            defaultChecked={formDataRef.current.rememberme}
          />
        }
        label="Remember me"
      />
      <Button
        sx={{
          marginBottom: "10px",
          backgroundColor: "#FF204E",
          "&:hover": {
            backgroundColor: "#FF204E",
          },
        }}
        variant="contained"
        onClick={onLoginClick}
      >
        Login
      </Button>
      <Typography>
        Not registered yet?{" "}
        <NavLink
          style={{
            textDecoration: "none",
            color: "#2E86ab",
          }}
          to="/register"
        >
          Create an account
        </NavLink>
      </Typography>
      <NavLink
        style={{
          fontWeight: "normal",
          textDecoration: "none",
          color: "#FF5733",
          alignSelf: "center",
          marginTop: "15px",
        }}
        to="/forgotpassword"
      >
        Forgot password?
      </NavLink>
    </Box>
  );
}
