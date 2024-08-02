import {
  Grid,
  Typography,
  Box,
  Button,
  ImageList,
  Rating,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deepOrange } from "@mui/material/colors";
import useStore from "../../app/store";
import CreateReport from "../report/CreateReport";
import CreateRating from "../rating/CreateRating";

import ProductCard from "./ProductCard";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { addDots } from "./../../utils/helper";
import CreateTrade from "../trade/CreateTrade";
import UpdateProduct from "./UpdateProduct";

export default function ProductDetail() {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  // console.log("params", params);

  const getProductById = useStore((state) => state.getProductById);
  const auth = useStore((state) => state.auth);
  const userId = useStore((state) => state.userId);
  const getSearchProductForUser = useStore(
    (state) => state.getSearchProductForUser
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductById(params.id);
    getSearchProductForUser(" ");
  }, [params.id]);

  const productDetail = useStore((state) => state.productDetail);

  const images = productDetail?.data?.productImageUrl?.map((url) => ({
    original: url,
    thumbnail: url,
    originalHeight: 300,
    originalWidth: 500,
  }));

  // console.log(productDetail);

  const searchResult = useStore((state) => state.searchResult);

  const filteredSearchResult = searchResult?.data?.items?.filter(
    (item) =>
      item.categoryName.toLowerCase() ===
        location?.state?.categoryName.toLowerCase() &&
      item.productId !== location?.state?.productId
  );

  // if (!location?.state) {
  //   return (
  //     <Typography variant="h4" align="center">
  //       Product details are unavailable. Please try again.
  //     </Typography>
  //   );
  // }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
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
              {productDetail?.data?.productName?.charAt(0).toUpperCase() +
                productDetail?.data?.productName?.slice(1)}
            </Typography>
            <Typography variant="body1" color={"gray"}>
              {productDetail?.data?.description}
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
                  {productDetail?.data?.userUpload?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="h4"
                  marginX={0.75}
                  marginY={1}
                  // fontFamily={"fantasy"}
                >
                  <Button
                    onClick={() =>
                      navigate(`/profile/${productDetail?.data?.userUploadId}`)
                    }
                    style={{ textTransform: "none", color: "inherit" }}
                    sx={{
                      fontSize: "2rem",
                      // fontFamily: "fantasy",
                    }}
                  >
                    {(
                      productDetail?.data?.userUpload?.charAt(0).toUpperCase() +
                      productDetail?.data?.userUpload?.slice(1)
                    ).toString()}
                  </Button>
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
                    {productDetail?.data?.averageNumberStars} (
                    {productDetail?.data?.numberOfRatings} reviews)
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
                    {productDetail?.data?.userPhoneNumber}
                  </Typography>
                )}
                {/* <Box display="flex" alignItems="center">
                  <CreateReport />
                </Box>
                <Box display="flex" alignItems="center">
                  <CreateRating />
                </Box> */}
                {(auth && userId !== productDetail?.data?.userUploadId && (
                  <Box display="flex" alignItems="center">
                    <CreateTrade productDetail={productDetail?.data} />
                  </Box>
                )) || (
                  <UpdateProduct
                    productId={params.id}
                    productDetail={productDetail?.data}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {filteredSearchResult?.length > 0 && (
        <>
          <Typography variant="h4" align="left">
            Similar Products
          </Typography>
          <ImageList sx={{ width: "100%" }} cols={10}>
            {filteredSearchResult?.length > 0 &&
              filteredSearchResult.map((item) => (
                <ProductCard key={item.productId} item={item} />
              ))}
          </ImageList>
        </>
      )}
    </>
  );
}
