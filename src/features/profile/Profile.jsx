import { useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Grid,
  Button,
  Typography,
  Badge,
  IconButton,
  Box,
  Tabs,
  Tab,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Rating,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import CreateNewProduct from "../products/CreateNewProduct";
import ProductCard from "../products/ProductCard";

import { red } from "@mui/material/colors";
import ProfileLayout from "./ProfileLayout";

const Profile = () => {
  const navigate = useNavigate();

  const userProfile = useStore((state) => state.userProfile);
  const productList = useStore((state) => state.productList);
  console.log("productList", productList);
  const getSellerProduct = useStore((state) => state.getSellerProduct);

  useEffect(() => {
    getSellerProduct();
  }, []);
  console.log(getSellerProduct)

  const sellerProductList = useStore((state) => state.sellerProductList);

  console.log("sellerProductList", sellerProductList?.data.items);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const waitingList = () => {
    return sellerProductList?.data.items.filter(
      (item) => item.isApproved === false && item.isActive === true
    );
  };

  const showingList = () => {
    return sellerProductList?.data.items.filter(
      (item) => item.isApproved === true && item.isActive === true
    );
  };

  const soldList = () => {
    return sellerProductList?.data.items.filter(
      (item) => item.isApproved === true && item.isActive === false
    );
  };
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* <Sidebar /> */}
      <Grid container justifyContent={"center"}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <CreateNewProduct />
          </Grid>
        </Grid>

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
              <Rating
                name="read-only"
                value={userProfile.averageNumberStars}
                readOnly
                precision={0.5}
                size="small"
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No ratings yet
              </Typography>
            )}
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate("/edit-profile")}
            >
              Chỉnh sửa trang cá nhân
            </Button>
          </Box>
        </Grid>

      </Grid>
      <Grid item xs={12} md={8}>
        <Grid item xs={10}>
          <Grid container spacing={1}>
            {sellerProductList?.data?.items.length > 0 ? (
              sellerProductList?.data?.items.map((item) => (
                <Grid
                  item
                  key={item.productId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  {/* <ProductCard item={item} /> */}
                  <Card
                    key={item.productId}
                    sx={{
                      maxWidth: 345,
                      minWidth: 200,
                      marginX: 1,
                      marginY: 1,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <CardActionArea
                      // disabled={isDisable}
                      onClick={() => {
                        navigate(`/products/${item.productId}`, {
                          state: item,
                        });
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={`${item.productImageUrl}?w=150&h=150&fit=crop&auto=format`}
                        alt={item.productName}
                        sx={{
                          objectFit: "cover",
                          borderBottom: "1px solid #ddd",
                        }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: "600",
                            color: "#333",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            mb: 1,
                          }}
                        >
                          {item.productName}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            gap: 0.5,
                          }}
                        >
                          <PersonIcon sx={{ color: "#555" }} />
                          <Typography
                            variant="body2"
                            component="div"
                            sx={{
                              color: "#555",
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.userUpload}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            gap: 0.5,
                          }}
                        >
                          <GradeIcon sx={{ color: "#555" }} />
                          <Typography
                            variant="body2"
                            component="div"
                            sx={{
                              color: "#555",
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            5
                          </Typography>
                        </Box>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            color: "#ff5722",
                            textAlign: "center",
                            fontWeight: "700",
                          }}
                        >
                          {item.price} VND
                        </Typography>
                        <Button
                          variant="contained"
                          href="#contained-buttons"
                          sx={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.isActive ? " success" : "On Going"}
                        </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h4">No Products</Typography>
            )}
          </Grid>
          {/* <Stack spacing={2} alignItems="center" marginTop={5}>
              <Pagination
                count={productList?.data.totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
