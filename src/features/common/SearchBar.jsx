import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useStore from "../../app/store";
import { useNavigate } from "react-router-dom";
import CreateNewProduct from "../products/CreateNewProduct";

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
    // vertical padding + font size from searchIcon
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
  // const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const getSearchProductForUser = useStore(
    (state) => state.getSearchProductForUser
  );

  //  console.log(getSearchProductForUser);
  const handOnInputChange = (value) => {
    setKeyword(value.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(keyword);
    await getSearchProductForUser(keyword, 4.4, 22.4);
    const searchResult = useStore.getState().searchResult;
    navigate("/search");
    console.log("searchResult", searchResult);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ "& > :not(style)": { m: 2 } }}>
        <Typography align="right">
          {/* <Fab
            color="primary"
            aria-label="add"
            size="medium"
            variant="extended"
          >
            New Product
          </Fab> */}
          <CreateNewProduct />
        </Typography>
      </Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none", marginTop: 2 }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={keyword}
              onChange={handOnInputChange}
            />
          </Search>
          <Stack direction="row" spacing={2} marginLeft={3}>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new post, please enter the details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}
