import * as React from "react";
import { Button, Dialog, Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import useStore from "../../app/store";
import ProductCard from "../products/ProductCard";
import { useNavigate } from "react-router-dom";

export default function AddItem({ onSelectProduct }) {
  const [open, setOpen] = useState(false);
  const { sellerProductList, getSellerProduct } = useStore((state) => ({
    sellerProductList: state.sellerProductList,
    getSellerProduct: state.getSellerProduct,
  }));
  const navigate = useNavigate();

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

  // Filter products with status "Approved"
  const approvedProducts =
    sellerProductList?.data?.items.filter(
      (item) => item.status === "Approved"
    ) || [];

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
          {/* <Button
            onClick={() => navigate(-1)}
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              minWidth: "auto",
              position: "absolute",
              left: "16px",
            }}
          >
            <ArrowBack sx={{ fontSize: 30 }} />
          </Button> */}
          <Typography
            variant="h4"
            sx={{ fontFamily: "fantasy", textAlign: "center", mt: 2, mb: 2 }}
          >
            Item You Have
          </Typography>
          <Grid container spacing={2}>
            {approvedProducts.map((item) => (
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
