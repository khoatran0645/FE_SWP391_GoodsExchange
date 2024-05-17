import { Grid, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation } from "react-router-dom";
export default function Product() {
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
  console.log("location", location.state);
  return (
    <Grid container>
      <Typography variant="h6">Product detail</Typography>
      <Grid item>
        <Box display="flex" flexDirection="row" alignItems="center">
          <img
            src={location.state.image}
            alt={location.state.title}
            style={{
              maxWidth: "50%",
              height: "auto",
              border: "2px solid grey",
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={15}>
            <Typography variant="h2">{location.state.title}</Typography>
            {renderStars(location.state.rating)}
            <Typography variant="h3">{location.state.price}</Typography>
            <Typography variant="p">{location.state.description}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
