import { useState, useEffect } from "react";
import useStore from "../../../app/store";
import { Grid, Typography, Box } from "@mui/material";
import ProductCardForProfile from "../Profile/ProductCardForProfile";
import { useParams } from "react-router-dom";

function InventoryTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const sellerProductList = useStore((state) => state.sellerProductList);

  const otherProfile = useStore((state) => state.otherProfile);
  const otherUserProductList = useStore((state) => state.otherUserProductList);

  const params = useParams();
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (params.id) {
      setIsOwner(false);
    } else {
      getSellerProduct();
    }
  }, []);

  console.log("otherUserProductList", otherUserProductList);
  console.log("otherProfile", otherProfile);

  const renderProductList = (productList) =>
    productList?.data.items.length > 0 ? (
      productList.data.items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.productId}>
          <ProductCardForProfile item={item} />
        </Grid>
      ))
    ) : (
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          No Products Available
        </Typography>
      </Grid>
    );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        fontFamily={"fantasy"}
      >
        {isOwner ? "My Inventory" : otherProfile?.fullName + "'s Inventory"}
      </Typography>
      <Grid container spacing={2}>
        {isOwner
          ? renderProductList(sellerProductList)
          : renderProductList(otherUserProductList)}
      </Grid>
    </Box>
  );
}

export default InventoryTrade;
