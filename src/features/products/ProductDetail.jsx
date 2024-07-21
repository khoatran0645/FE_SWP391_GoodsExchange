import {
  Grid,
  Typography,
  Box,
  Button,
  ImageList,
  Rating,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deepOrange } from "@mui/material/colors";
import useStore from "../../app/store";
import CreateReport from "../report/CreateReport";
import CreateRating from "../rating/CreateRating";

import ProductCard from "./ProductCard";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { addDots } from "./../../utils/helper";

export default function ProductDetail() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  let location = useLocation();
  console.log("location", location);
  const navigate = useNavigate();

  const getProductById = useStore((state) => state.getProductById);
  const auth = useStore((state) => state.auth);
  const getSearchProductForUser = useStore(
    (state) => state.getSearchProductForUser
  );

  useEffect(() => {
    getProductById(location.state.productId);
    getSearchProductForUser(" ");
  }, [location]);
  const productDetail = useStore((state) => state.productDetail);
  console.log("productDetail", productDetail?.data);
  const images = productDetail?.data.productImageUrl.map((url) => ({
    original: url,
    thumbnail: url,
    originalHeight: 300,
    originalWidth: 500,
  }));
  // console.log("images", images);

  const searchResult = useStore((state) => state.searchResult);
  // console.log("searchResult", searchResult);

  const filteredSearchResult = searchResult?.data.items.filter(
    (item) =>
      item.categoryName.toLowerCase() ==
        location.state.categoryName.toLowerCase() &&
      item.productId !== location.state.productId
  );
  // console.log("filteredSearchResult :", filteredSearchResult);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Typography variant="h5" align="center">
          PRODUCT DETAIL
        </Typography> */}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* <img
              src={location?.state.productImageUrl}
              alt={location?.state.productName}
              style={{
                maxWidth: "100%",
                height: "50%",
                margin: 12,
                borderRadius: 30,
                border: "2px solid #ccc",
              }}
            /> */}
            {images && (
              <ImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay
                showNav={false}
                items={images}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              {location?.state.productName.charAt(0).toUpperCase() +
                location?.state.productName.slice(1)}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#ff5722",
                fontWeight: "bold",
              }}
            >
              {addDots(location?.state.price)} VND
            </Typography>
            <Typography variant="body1" color={"gray"}>
              {location?.state.description}
            </Typography>
          </Box>
          <hr style={{ borderTop: "2px solid black" }} />

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
                <Avatar
                  sx={{ bgcolor: deepOrange[500], width: 50, height: 50 }}
                >
                  {productDetail?.data.userUpload.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="h4"
                  marginX={0.75}
                  marginY={1}
                  fontFamily={"fantasy"}
                >
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                  gap: 2,
                }}
              >
                {!showPhoneNumber ? (
                  <Button
                    onClick={() => {
                      auth ? setShowPhoneNumber(true) : navigate("/login");
                    }}
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Show phone number
                  </Button>
                ) : (
                  <Typography sx={{ fontSize: 23 }}>
                    {productDetail?.data.userPhoneNumber}
                  </Typography>
                )}
                <Box display="flex" alignItems="center">
                  <CreateReport />
                </Box>
                <Box display="flex" alignItems="center">
                  <CreateRating />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h4" align="left">
        Similar Products
      </Typography>
      <ImageList
        sx={{ width: "100%" }}
        cols={10}
        // rowHeight={164}
      >
        {filteredSearchResult?.length > 0 ? (
          filteredSearchResult.map((item) => (
            <ProductCard key={item.productId} item={item} />
          ))
        ) : (
          <Typography variant="h4">No Product Found</Typography>
        )}
      </ImageList>
    </>
  );
}
