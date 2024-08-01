import React from "react";
import useStore from "../../../app/store";
import { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCardForProfile from "../Profile/ProductCardForProfile";

function InventoryTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const sellerProductList = useStore((state) => state.sellerProductList);

  useEffect(() => {
    getSellerProduct();
  }, [getSellerProduct]);

  console.log(sellerProductList);
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        fontFamily={"fantasy"}
      >
        My Inventory
      </Typography>
      <Grid container spacing={2}>
        {sellerProductList?.data.items.length > 0 ? (
          sellerProductList.data.items.map((item) => (
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
        )}
      </Grid>
    </Box>
  );
}

export default InventoryTrade;
