import { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  Button,
  Typography,
  Badge,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../app/store";
import CreateNewProduct from "../../products/CreateNewProduct";
import ProductCard from "../../products/ProductCard";
import CarouselProductForProfilePage from "./CarouselProductForProfilePage";

export default function Profile() {
  const [isOwner, setIsOwner] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const userProfile = useStore((state) => state.userProfile);
  const otherProfile = useStore((state) => state.otherProfile);
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const getOtherUserProduct = useStore((state) => state.getOtherUserProduct);

  useEffect(() => {
    if (params.id) {
      setIsOwner(false);
      getOtherUserProduct(params.id);
    } else {
      getSellerProduct();
    }
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);

  const otherUserProductList = useStore((state) => state.otherUserProductList);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("userProfile", userProfile);
  console.log("sellerProductList", sellerProductList);

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            textAlign: "center",
            position: "relative",
            bgcolor: "#fafafa",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: "white",
                    border: "1px solid #e0e0e0",
                    padding: "2px",
                  }}
                ></IconButton>
              }
            >
              <Avatar
                alt={isOwner ? userProfile.lastName : otherProfile?.lastName}
                src={
                  isOwner
                    ? userProfile.userImageUrl
                    : otherProfile?.userImageUrl
                }
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </Box>

          <Typography variant="h6" sx={{ mt: 1 }}>
            {isOwner
              ? userProfile.lastName + " " + userProfile.firstName
              : otherProfile?.lastName + " " + otherProfile?.firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Phone:{" "}
            {isOwner ? userProfile.phoneNumber : otherProfile?.phoneNumber}
          </Typography>

          {userProfile?.averageNumberStars ||
          otherProfile?.averageNumberStars ? (
            <Typography>
              <Rating
                name="read-only"
                value={
                  isOwner
                    ? userProfile.averageNumberStars
                    : otherProfile?.averageNumberStars
                }
                readOnly
                precision={0.5}
                size="small"
              />
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No ratings yet
            </Typography>
          )}

          {isOwner && (
            <Button
              variant="outlined"
              sx={{
                width: "10rem",
                mt: 1,
                backgroundColor: "white",
                borderColor: "#FF204E",
                color: "#FF204E",
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "#FF204E",
                },
              }}
              onClick={() => navigate("edit-profile")}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        {isOwner ? (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontFamily={"fantasy"}
                    sx={{
                      flexGrow: 1,
                      textAlign: "center",
                      position: "relative",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    Your Newest Product Status
                  </Typography>
                  <CreateNewProduct />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CarouselProductForProfilePage
                  sellerProductList={sellerProductList}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}
