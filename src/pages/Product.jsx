import { Grid, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Description } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Rating from "@mui/material/Rating";

export default function Product() {
  const [showPhoneNumber, setshowPhoneNumber] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  // const getStarColor = (index, rating) => {
  //   // Change the color intensity based on the rating
  //   const color = index < rating ? "gold" : "gray";
  //   return color;
  // };

  // const renderStars = (rating, maxRating = 5) => {
  //   return (
  //     <Box display="flex" alignItems="center">
  //       {Array.from({ length: maxRating }, (_, index) =>
  //         index < rating ? (
  //           <StarIcon
  //             key={index}
  //             style={{ color: getStarColor(index, rating) }}
  //           />
  //         ) : (
  //           <StarBorderIcon
  //             key={index}
  //             style={{ color: getStarColor(index, rating) }}
  //           />
  //         )
  //       )}
  //     </Box>
  //   );
  // };
  // console.log("location", location.state);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          PRODUCT DETAIL
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={location.state.image}
            alt={location.state.title}
            style={{
              maxWidth: "100%",
              height: "50%",
              margin: 12,
              borderRadius: 30,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h3">
            {location.state.title.charAt(0).toUpperCase() +
              location.state.title.slice(1)}
          </Typography>
          <Typography variant="h4">{location.state.price} VND</Typography>
          <Typography variant="body1">{location.state.description}</Typography>
        </Box>
        <hr />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="15vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={0.5}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ bgcolor: deepOrange[500], width: 50, height: 50 }}>
                {location.state.nameOfPoster.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h4" marginX={0.75} marginY={1}>
                {location.state.nameOfPoster.charAt(0).toUpperCase() +
                  location.state.nameOfPoster.slice(1)}
              </Typography>
            </Box>
            {/* <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
            >
              {renderStars(location.state.rating)}
            </Box> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              marginTop={0.5}
            >
              <Rating
                name="read-only"
                value={location.state.rating}
                readOnly
                precision={0.5}
                size="small"
              />
              <Box>
                <Typography variant="body2" component="p" marginLeft={0.5}>
                  {location.state.rating}
                  {" "}
                  ({location.state.numberOfReviews}{" "}
                  reviews)
                </Typography>
              </Box>
            </Box>

            {!showPhoneNumber ? (
              <Button
                onClick={() => setshowPhoneNumber(true)}
                sx={{
                  // Change text color to blue or any color you prefer
                  borderRadius: 2,
                  marginTop: 1, // Add margin for spacing
                  width: "200%",
                  "&:hover": {
                    backgroundColor: "#5C88C4",
                    color: "#ffffff",
                  },
                }}
              >
                Show phone number
              </Button>
            ) : (
              <Typography
                sx={{ textAlign: "center", marginTop: 1, fontSize: 23 }}
              >
                {location.state.phoneOfPoster}
              </Typography>
            )}
            <Button
              sx={{
                borderRadius: 2,
                marginTop: 1,
                width: "200%",
                "&:hover": {
                  backgroundColor: "#40A578", // Hover background color
                  color: "#ffffff", // Hover text color
                },
              }}
              onClick={() => navigate("/chat")}
            >
              Chat with seller
            </Button>
            <Button
              sx={{
                borderRadius: 2,
                marginTop: 1,
                width: "200%",
                "&:hover": {
                  backgroundColor: "red", // Hover background color
                  color: "#ffffff", // Hover text color
                },
              }}
            >
              Report
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
