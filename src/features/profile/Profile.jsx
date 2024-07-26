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
  Rating,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import CreateNewProduct from "../products/CreateNewProduct";
import ProductCard from "../products/ProductCard";

const Profile = () => {
  const navigate = useNavigate();

  const userProfile = useStore((state) => state.userProfile);
  // console.log("userProfile", userProfile);

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

  return (
    <>
      <NavBar />

      <Grid container justifyContent="flex-end">
        <Grid item>
          <CreateNewProduct />
        </Grid>
      </Grid>

      <Grid container spacing={2} padding={3}>
        <Grid item xs={12} md={4}>
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
            {/* {in4List.map((in4) => ( */}

            <Typography variant="h6" sx={{ mt: 1 }}>
              {userProfile.lastName} {userProfile.firstName}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Phone: {userProfile.phoneNumber}
            </Typography>

            {/* ))} */}
            {/* <Typography variant="body2" color="textSecondary">
              Chưa có đánh giá
            </Typography> */}
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

        <Grid item xs={12} md={8}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Đang cho duyet"
                  value="1"
                  onClick={() => waitingList()}
                />
                <Tab
                  label="Đang hiển thị"
                  value="2"
                  onClick={() => showingList()}
                />
                <Tab label="Đã bán" value="3" />
              </TabList>
            </Box>
            {waitingList()?.length > 0
              ? waitingList().map((item) => (
                  <TabPanel value="1" key={item.productId}>
                    <ProductCard item={item} isDisable={true} />
                  </TabPanel>
                ))
              : null}

            {showingList()?.length > 0
              ? showingList().map((item) => (
                  <TabPanel value="2" key={item.productId}>
                    <ProductCard item={item} />
                  </TabPanel>
                ))
              : null}

            {soldList()?.length > 0
              ? soldList().map((item) => (
                  <TabPanel value="3" key={item.productId}>
                    <ProductCard item={item} />
                  </TabPanel>
                ))
              : null}

            {/* <TabPanel value="1">Item 2</TabPanel>
            <TabPanel value="2">Item 3</TabPanel>
            <TabPanel value="1">Item 4</TabPanel>
            <TabPanel value="2">Item 5</TabPanel>
            <TabPanel value="2">Item 6</TabPanel>
            <TabPanel value="2">Item 7</TabPanel>
            <TabPanel value="2">Item 8</TabPanel> */}
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
