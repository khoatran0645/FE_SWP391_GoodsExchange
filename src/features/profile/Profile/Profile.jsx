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
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/store";
import CreateNewProduct from "../../products/CreateNewProduct";
import ProductCard from "../../products/ProductCard";
import CarouselProductForProfilePage from "./CarouselProductForProfilePage";

export default function Profile() {
  const navigate = useNavigate();

  const userProfile = useStore((state) => state.userProfile);
  const getSellerProduct = useStore((state) => state.getSellerProduct);

  useEffect(() => {
    getSellerProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(sellerProductList);

  return (
    <>
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
                  alt={userProfile.lastName}
                  src={userProfile?.userImageUrl}
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Box>

            <Typography variant="h6" sx={{ mt: 1 }}>
              {userProfile.lastName} {userProfile.firstName}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Phone: {userProfile.phoneNumber}
            </Typography>

            {userProfile && userProfile.averageNumberStars ? (
              <Typography>
                <Rating
                  name="read-only"
                  value={userProfile.averageNumberStars}
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
          </Box>
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
        </Grid>
      </Grid>
    </>
  );
}
