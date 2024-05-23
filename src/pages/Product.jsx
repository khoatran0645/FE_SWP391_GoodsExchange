import { Grid, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation } from "react-router-dom";
import { AccountCircle, Description } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";

export default function Product() {
  const [showPhoneNumber, setshowPhoneNumber] = useState(false);
  let location = useLocation();

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
    <Grid container>
      <Typography variant="h6">Product detail</Typography>
      <Grid item>
        <Box display="flex" flexDirection="row" alignItems="center">
          <img
            src={location.state.image}
            alt={location.state.title}
            style={{
              maxWidth: "35%",
              height: "auto",
              // border: "2px solid grey",
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={15}>
            <Typography variant="h2">
              {location.state.title.charAt(0).toUpperCase() +
                location.state.title.slice(1)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircle sx={{ width: 30 }} />
              <Typography variant="h4" marginX={0.5} marginY={1}>
                {location.state.nameOfPoster.charAt(0).toUpperCase() +
                  location.state.nameOfPoster.slice(1)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <LocalPhoneIcon sx={{ width: 30 }} /> */}
              {/* <Typography variant="h4" marginX={0.5} marginY={1}>
                {location.state.phoneOfPoster}
              </Typography> */}
            </Box>

            {renderStars(location.state.rating)}
            <Typography variant="h3">{location.state.price} VND</Typography>
            <Typography variant="p">{location.state.description}</Typography>
            {!showPhoneNumber ? (
              <Button onClick={() => setshowPhoneNumber(true)}>
                Show Phone Number
              </Button>
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                {location.state.phoneOfPoster}
              </Typography>
            )}

            <Button>Chat with seller</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
