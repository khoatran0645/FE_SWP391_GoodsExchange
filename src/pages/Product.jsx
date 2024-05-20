import { Grid, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";
export default function Product() {
  let location = useLocation();

  console.log("location", location.state);
  return (
    <Grid container>
      <Typography variant="h6">Product detail</Typography>
      <Grid item>
        <img  src={location.state.image} alt={location.state.title}/>
        <Typography variant="h2">{location.state.title}</Typography>
        <Typography variant="h3">{location.state.price} vnd</Typography>
      </Grid>
    </Grid>
  );
}
