import { Grid, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Description } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";

export default function Product() {
  const [showPhoneNumber, setshowPhoneNumber] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  const getStarColor = (index, rating) => {
    // Change the color intensity based on the rating
    const color = index < rating ? "gold" : "gray";
    return color;
  };

  const renderStars = (rating, maxRating = 5) => {
    return (
      <Box display="flex" alignItems="center">
        {Array.from({ length: maxRating }, (_, index) =>
          index < rating ? (
            <StarIcon
              key={index}
              style={{ color: getStarColor(index, rating) }}
            />
          ) : (
            <StarBorderIcon
              key={index}
              style={{ color: getStarColor(index, rating) }}
            />
          )
        )}
      </Box>
    );
  };
  // console.log("location", location.state);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Product Detail
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={location.state.image}
            alt={location.state.title}
            style={{
              maxWidth: "100%",
              height: "auto",
              margin: 12,
              borderRadius: 30,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h2">
            {location.state.title.charAt(0).toUpperCase() +
              location.state.title.slice(1)}
          </Typography>
          <Typography variant="h4">{location.state.price} VND</Typography>
          <Typography variant="body1">{location.state.description}</Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="top"
          justifyContent="center"
          minHeight="15vh"
          sx={{ backgroundColor: "lightblue", borderRadius: 4 }}
        >
          <Box display="flex" flexDirection="column" marginLeft={15}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
                Thanh
              </Avatar>
              <Typography variant="h4" marginX={0.5} marginY={1}>
                {location.state.nameOfPoster.charAt(0).toUpperCase() +
                  location.state.nameOfPoster.slice(1)}
              </Typography>
            </Box>
            {renderStars(location.state.rating)}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalPhoneIcon sx={{ width: 30 }} />
              <Typography variant="h4" marginX={0.5} marginY={1}>
                {location.state.phoneOfPoster}
              </Typography>
            </Box>

            {!showPhoneNumber ? (
              <Button
                onClick={() => setshowPhoneNumber(true)}
                sx={{
                  backgroundColor: "green",
                  color: "blue", // Change text color to blue or any color you prefer
                  borderRadius: 2.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Show phone number
              </Button>
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                {location.state.phoneOfPoster}
              </Typography>
            )}

            <Button
              sx={{
                marginTop: 1.5,
              }}
              onClick={() => navigate("/chat")}
            >
              Chat with seller
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
