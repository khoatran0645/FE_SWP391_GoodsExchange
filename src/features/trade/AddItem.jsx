import * as React from "react";
import { Button, Dialog, Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import useStore from "../../app/store";
import ProductCard from "../products/ProductCard";
import { useEffect } from "react";

export default function AddItem({ onSelectProduct }) {
  const [open, setOpen] = useState(false);
  const { sellerProductList, getSellerProduct } = useStore((state) => ({
    sellerProductList: state.sellerProductList,
    getSellerProduct: state.getSellerProduct,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      getSellerProduct();
    }
  }, [open, getSellerProduct]);

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#C7C8CC",
          color: "white",
          "&:hover": {
            backgroundColor: "#686D76",
          },
        }}
      >
        <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box p={3}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "fantasy", textAlign: "center", mt: 2, mb: 2 }}
          >
            Item You Have
          </Typography>
          <Grid container spacing={2}>
            {sellerProductList?.data?.items.map((item) => (
              <Grid item xs={4} key={item.productId}>
                <ProductCard
                  item={item}
                  onSelect={() => {
                    onSelectProduct(item);
                    handleClose();
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
