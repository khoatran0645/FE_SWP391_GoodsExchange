import React from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CarouselProductForProfilePage from "../Profile/CarouselProductForProfilePage";

function InventoryTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();

  useEffect(() => {
    getSellerProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);

  console.log("sellerProductList: ", sellerProductList?.data.items);
  return (
    <>
      {/* <Sidebar /> */}
      <Grid item xs={12}>
        <CarouselProductForProfilePage sellerProductList={sellerProductList} />
      </Grid>
    </>
  );
}

export default InventoryTrade;
