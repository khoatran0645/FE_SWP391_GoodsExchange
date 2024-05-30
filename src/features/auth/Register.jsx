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
import { NavLink } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
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
    const [showPasswordCollapse, setShowPasswordCollapse] = useState(false);
    const [showConfirmPasswordCollapse, setShowConfirmPasswordCollapse] =
        useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [formData, setFormData] = useState({
        email: "example@gmail.com",
        username: "admin",
        password: "password1",
        confirm_password: "wrongpass",
    });

    useEffect(() => {
        const isShowPassword = formData.password.length > 0;
        const isShowConfirmPassword = formData.confirm_password.length > 0;
        const passwordMatch = formData.password === formData.confirm_password;
        setShowPasswordCollapse(isShowPassword);
        setShowConfirmPasswordCollapse(isShowConfirmPassword);
        setIsPasswordMatch(passwordMatch);
    }, [formData]);

    const googleLoginSuccess = (response) => {
        console.log(response);
    };
    const googleLoginError = (error) => {
        console.log(error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Box onSubmit={handleSubmit} component="form" sx={formStyle}>
            <Typography
                sx={{
                    marginBottom: "20px",
                }}
                variant="h5"
                gutterBottom
            >
                Register your Account
            </Typography>
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
                    value={formData.username}
                    onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
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
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
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
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
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
                        )
                    }
                    label="Confirm password"
                    value={formData.confirm_password}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            confirm_password: e.target.value,
                        });
                    }}
                />
                {!isPasswordMatch && (
                    <FormHelperText error>
                        Passwords do not match
                    </FormHelperText>
                )}
            </FormControl>
            <Button
                sx={{
                    marginTop: "10px",
                    marginBottom: "15px",
                }}
                variant="contained"
                type="submit"
            >
                Register
            </Button>
            <Box>
                <Typography>
                    Already have an account?{" "}
                    <NavLink
                        style={{
                            fontWeight: "normal",
                            textDecoration: "none",
                            color: "#2E86AB",
                        }}
                        to="/login"
                    >
                        Login to your Account
                    </NavLink>
                </Typography>
            </Box>
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
