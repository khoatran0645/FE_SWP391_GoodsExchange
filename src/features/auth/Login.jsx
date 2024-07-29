import { useState, useEffect } from "react";
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
  const getProfileUserById = useStore((state) => state.getProfileUserById);
  const setUserId = useStore((state) => state.setUserId);

  const navigate = useNavigate();

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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onLoginClick = async (e) => {
    e.preventDefault();

    const { username, password, rememberme } = formData;

    if (!username || !password) {
      toast.error("Please enter your username and password");
      return;
    }

    await postLogin({ username, password });
    const userInfo = useStore.getState().userInfo;
    const auth = useStore.getState().auth;

    if (auth) {
      const token = userInfo.data.token;
      if (rememberme) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      await getProfileUserById(decoded.id);

      if (userInfo.data.role === "Moderator") {
        navigate("/moderator");
      } else if (userInfo.data.role === "Administrator") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Box sx={formStyle}>
      <Typography sx={{ marginBottom: "20px" }} variant="h5" gutterBottom>
        Login to your Account
      </Typography>

      <FormControl sx={{ marginBottom: "10px" }} variant="outlined">
        <InputLabel htmlFor="outlined-username">Username</InputLabel>
        <OutlinedInput
          id="outlined-username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
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
        />
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            name="rememberme"
            checked={formData.rememberme}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      <Button
        sx={{
          marginBottom: "10px",
          backgroundColor: "#FF204E",
          "&:hover": { backgroundColor: "#FF204E" },
        }}
        variant="contained"
        onClick={onLoginClick}
      >
        Login
      </Button>
      <Button
        sx={{
          marginBottom: "10px",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "black" },
        }}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <Typography>
        Not registered yet?{" "}
        <NavLink
          style={{ textDecoration: "none", color: "#2E86ab" }}
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
        to="/forgot-password"
      >
        Forgot password?
      </NavLink>
    </Box>
  );
}
