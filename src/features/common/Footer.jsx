import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      <Link
        sx={{
          marginX: 2,
        }}
        color="inherit"
        href="https://github.com/khoatran0645/FE_SWP391_GoodsExchange"
      >
        GEFU frontend
      </Link>
      <Link
        color="inherit"
        href="https://github.com/hauzanq/BE_SWP391_GoodsExchange"
      >
        GEFU backend
      </Link>{" "}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "55vh",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[300]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/logo2.png"
              alt=""
              style={{ width: "2.5rem", marginRight: 7 }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              GoodsExchange{" "}
              <span
                style={{
                  background: "linear-gradient(to bottom, #fad126, #f15652)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                FU
              </span>
            </Typography>
          </Box>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            The best place to exchange goods seamlessly.
          </Typography>
          {/* <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            paragraph
          >
            Join our community to exchange goods with ease and confidence.
            Whether you're looking to swap items you no longer need or find
            something new, GoodsExchange FU offers a secure and friendly
            platform to connect with others.
          </Typography> */}
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            paragraph
          >
            Need help? Visit our{" "}
            <Link href="/help" color="inherit">
              Help Center
            </Link>{" "}
            or contact our support team at{" "}
            <Link href="mailto:support@gefu.com" color="inherit">
              support@gefu.com
            </Link>
            .
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
