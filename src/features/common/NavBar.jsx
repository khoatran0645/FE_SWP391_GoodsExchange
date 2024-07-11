import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import { NavLink, Link, useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import { toast } from "react-toastify";

export default function NavBar() {
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const setAuth = useStore((state) => state.setAuth);

  const pages = ["User"];
  const settings = ["Profile", "Logout"];
  // const options = ["Electronics", "Stationery", "Papers", "Sensors", "Pen"];

  const navigate = useNavigate();
  const auth = useStore((state) => state.auth);
  const getAllCategories = useStore((state) => state.getAllCategories);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const categories = useStore((state) => state.categories);
  // console.log("categories", categories);
  const options =
    categories?.data?.map((category) => ({
      key: category.categoryId,
      label: category.categoryName,
    })) || [];

  // console.log("options", options);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl" sx={{}}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GoodsExchange <font color="orange">FU</font>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Link to={`/${page}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={`/${page}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  z
                >
                  {page}
                </Link>
              </Button>
            ))} */}
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" variant="standard" />
              )}
            /> */}
          </Box>

          {auth ? (
            <Box sx={{ flexGrow: 0 }}>
              {/* <IconButton aria-label={notificationsLabel(100)}>
                <Typography marginX={2}>
                  <Badge
                    badgeContent={100}
                    color="secondary"
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    <ChatIcon />
                  </Badge>
                </Typography>
              </IconButton> */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Logout" ? (
                      <Typography
                        onClick={() => {
                          localStorage.clear();
                          sessionStorage.clear();
                          useStore.setState({ userInfo: null });
                          setAuth(false);
                          navigate("/");
                          toast.success("Logout successfully");
                        }}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    ) : (
                      <Typography
                        onClick={() => {
                          navigate("/profile");
                        }}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button sx={{ color: "white" }} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
