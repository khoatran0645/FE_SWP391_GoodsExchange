import { Grid, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Description } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import useStore from "../../app/store";
import CreateReport from "../report/CreateReport";

export default function Product() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  console.log("location", location.state);

  const getProductById = useStore((state) => state.getProductById);

  useEffect(() => {
    getProductById(location.state.productId);
  }, []);

  const productDetail = useStore((state) => state.productDetail);
  console.log("productDetail", productDetail?.data);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <Typography variant="h5" align="center">
          PRODUCT DETAIL
        </Typography> */}
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={location?.state.productImageUrl}
            alt={location?.state.productName}
            style={{
              maxWidth: "100%",
              height: "50%",
              margin: 12,
              borderRadius: 30,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ width: "100%", maxWidth: "327px" }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h3" sx={{ flexGrow: 1, flexShrink: 1, overflowWrap: "break-word"}}>
            {location?.state.productName.charAt(0).toUpperCase() +
              location?.state.productName.slice(1)}
          </Typography>
          <Typography variant="h4">{location.state.price} VND</Typography>
          <Typography variant="body1">{location?.state.description}</Typography>
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
                {productDetail?.data.userUpload.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h4" marginX={0.75} marginY={1}>
                {(
                  productDetail?.data.userUpload.charAt(0).toUpperCase() +
                  productDetail?.data.userUpload.slice(1)
                ).toString()}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              marginTop={0.5}
            >
              <Rating
                name="read-only"
                value={
                  productDetail ? productDetail.data.averageNumberStars : 0
                }
                readOnly
                precision={0.5}
                size="small"
              />
              <Box>
                <Typography variant="body2" component="p" marginLeft={0.5}>
                  {location.state.averageNumberStars} (
                  {productDetail?.data.numberOfRatings} reviews)
                </Typography>
              </Box>
            </Box>

            {!showPhoneNumber ? (
              <Button
                onClick={() => setShowPhoneNumber(true)}
                sx={{
                  backgroundColor: "#5C88C4",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#5C88C4",
                  },
                  marginTop: 1,
                }}
              >
                Show phone number
              </Button>
            ) : (
              <Typography
                sx={{ textAlign: "center", marginTop: 1, fontSize: 23 }}
              >
                {productDetail?.data.userPhoneNumber}
              </Typography>
            )}
            <Button
              sx={{
                backgroundColor: "#40A578",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#40A578",
                },
                marginTop: 0.8,
              }}
              onClick={() => navigate("/chat")}
            >
              Chat with seller
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "red",
                },
                height: "2.6em",
                marginTop: 0.8,
              }}
            >
              <CreateReport />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
