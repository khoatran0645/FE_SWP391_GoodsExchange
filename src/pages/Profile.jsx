import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Profile() {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Box
          height={200}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey", backgroundColor: "#1876D2" }}
        >
          This Box uses MUI System props for quick customization.
        </Box>
      </Grid>

      <Grid item xs={9}>
        <Box></Box>
      </Grid>
    </Grid>
  );
}
