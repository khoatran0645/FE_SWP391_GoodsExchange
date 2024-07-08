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
import { addDots } from "../../utils/helper";

export default function ProductDetail() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  // console.log("location", location.state);

  const getProductById = useStore((state) => state.getProductById);

  useEffect(() => {
    getProductById(location.state.productId);
  }, []);

  const productDetail = useStore((state) => state.productDetail);
  // console.log("productDetail", productDetail?.data);

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
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h3">
            {location?.state.productName.charAt(0).toUpperCase() +
              location?.state.productName.slice(1)}
          </Typography>
          <Typography variant="h4">
            {addDots(location?.state.price)} VND
          </Typography>
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
                {productDetail?.data.userPhoneNumber}
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

            <CreateReport />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
