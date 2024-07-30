import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AccessDenied() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-3); // Goes back to the previous page
  };
  return (
    <Grid>
      <Typography variant="h1" color={"error"}>
        Access denied
      </Typography>
      <Button onClick={handleGoBack}>Go back</Button>
    </Grid>
  );
}
