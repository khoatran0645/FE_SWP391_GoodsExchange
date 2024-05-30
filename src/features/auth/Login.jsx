import { useEffect, useState } from "react";
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
import { Padding } from "@mui/icons-material";

import { GoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";

import useStore from "../../app/store";
import { toast } from "react-toastify";

export default function Login() {
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const userInfo = useStore((state) => state.userInfo);
  const toggleAuth = useStore((state) => state.toggleAuth);
  const postLogin = useStore((state) => state.postLogin);

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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
  });

  const onLoginClick = async (e) => {
    e.preventDefault();
    
    await postLogin(formData);
    console.log("isLoading2", isLoading);
    console.log("error2", error);
    console.log("userInfo2", userInfo);
  };

  return (
    // formStyle : css
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
          label="Username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
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
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) =>
              setFormData({
                ...formData,
                rememberme: e.target.checked,
              })
            }
          />
        }
        label="Remember me"
      />
      <Button
        sx={{
          marginBottom: "10px",
        }}
        variant="contained"
        onClick={onLoginClick}
      >
        Login
      </Button>
      <Typography>
        Not registered yet?
        {/* Navlink => chuyen link */}
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
      <Typography
        sx={{
          alignSelf: "center",
        }}
      >
        Forgot password?
      </Typography>
    </Box>
  );
}
