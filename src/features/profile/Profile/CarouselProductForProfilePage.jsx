import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCardForProfile from "./ProductCardForProfile";
import useStore from "../../../app/store";
import { toast } from "react-toastify";

export default function CarouselProductForProfilePage({ sellerProductList }) {
  const itemsPerPage = 6;
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const deleteProduct = useStore((state) => state.deleteProduct);

  const handleDelete = (id) => {
    console.log("DELETE");
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteDialog(false);
    await deleteProduct(categoryToDelete);
    const response = useStore.getState().response;
    if (response) {
      await getSellerProduct();
      toast.success("Product deleted successfully", {
        style: {
          marginTop: "50px",
        },
      });
    }
  };

  const paginateProducts = (products, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < products.length; i += itemsPerPage) {
      pages.push(products.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const paginatedProducts = paginateProducts(
    sellerProductList?.data?.items || [],
    itemsPerPage
  );

  return (
    <div>
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {paginatedProducts.map((productGroup, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 2,
            }}
          >
            {productGroup.map((product) => (
              <Box
                key={product.productId}
                sx={{
                  maxWidth: "20%",
                  margin: "1rem",
                  marginLeft: "1rem",
                }}
              >
                <ProductCardForProfile item={product} onDelete={handleDelete} />
              </Box>
            ))}
          </Box>
        ))}
      </Carousel>

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
