import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AdbIcon from "@mui/icons-material/Adb";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GEFU
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            flex: 1,
          }}
        >
          {/* Main content goes here */}
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" align="center">
              GoodsExchange <font color="orange">FU</font>
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}