import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

import CreateNewProduct from "../features/products/CreateNewProduct";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.4),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
}));

export default function SearchAppBar() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchAppBar, setShowSearchAppBar] = useState(true);

  useEffect(() => {
    const noSearchAppBarRoutes = ["/chat", "/create_new_product", "/products/"];
    setShowSearchAppBar(!noSearchAppBarRoutes.includes(location.pathname));
  }, [location.pathname]);

  if (!showSearchAppBar) return null;
=======
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
>>>>>>> main

  return (
    <Box
      sx={{
        flexGrow: 1,
        // backgroundImage: "linear-gradient(to right, #373B44, #c471ed, #f64f59)",
      }}
    >
      <Box sx={{ "& > :not(style)": { m: 0 } }}>
        <Typography align="right">
          {/* <Fab
            color="primary"
            aria-label="add"
            size="medium"
            variant="extended"
            sx={{
              "&:focus, &:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
              marginTop:2
            }}
            onClick={() => navigate("/create_new_product")}
          >
            New Product
          </Fab> */}
          <CreateNewProduct />
        </Typography>
      </Box>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
