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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import { toast } from "react-toastify";

export default function NavBar() {
  const userProfile = useStore((state) => state.userProfile);

  const logout = useStore((state) => state.logout);

  const pages = ["User"];

  const navigate = useNavigate();
  const auth = useStore((state) => state.auth);
  const getAllCategories = useStore((state) => state.getAllCategories);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const categories = useStore((state) => state.categories);
  const options =
    categories?.data?.map((category) => ({
      key: category.categoryId,
      label: category.categoryName,
    })) || [];

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

  const handleLogoClick = () => {
    navigate("/moderator/manage-products");
    window.location.reload(); // F5 lại trang
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: "1201" }}>
      <Container maxWidth="100%" sx={{ display: "flex" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo2.png"
              alt=""
              style={{ width: "3rem", marginRight: 7, cursor: "pointer" }}
              onClick={handleLogoClick}
            />
            <Link
              to="/moderator/manage-products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#ECEBE9",
                  textDecoration: "none",
                }}
              >
                GoodsExchange{" "}
                <span
                  style={{
                    background: "linear-gradient(to bottom, #fad126, #f15652)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  FU
                </span>
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Các nút khác trong menu có thể được thêm ở đây */}
          </Box>

          {auth ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userProfile?.fullName}
                    src={userProfile?.userImageUrl}
                  />
                  <Typography sx={{ color: "white", ml: 1 }}>
                    {userProfile?.fullName}
                  </Typography>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={() => {
                      logout();
                      navigate("/");
                      toast.success("Logout successfully");
                    }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Button
                sx={{ color: "white" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
