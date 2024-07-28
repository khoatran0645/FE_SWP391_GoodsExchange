import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { ArrowBack } from "@mui/icons-material";
import AddItem from "./AddItem";

import useStore from "../../app/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTrade({ productDetail }) {
  const params = useParams();
  console.log("params", params);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // console.log("productDetail", productDetail);
  console.log("selectedProduct", selectedProduct);

  const sendRequest = useStore((state) => state.sendRequest);
  const error = useStore((state) => state.error);
  const isLoading = useStore((state) => state.isLoading);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("form", {"currentProductId": params.id, "targetProductId": selectedProduct?.productId});
    await sendRequest({
      currentProductId: params.id,
      targetProductId: selectedProduct?.productId,
    });
    if(isLoading == false && error == null){
      toast.success("Trade created successfully");
    }else{
      toast.error(error);
    }

    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#FF204E",
          color: "white",
          "&:hover": {
            backgroundColor: "#FF204E",
          },
        }}
      >
        Trade
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            position: "relative",
          }}
        >
          <Button
            onClick={handleClose}
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
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ fontFamily: "fantasy" }}
            >
              Create Trade
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Container
            sx={{ mt: 4, padding: 2, borderRadius: "8px", boxShadow: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: 2,
                    borderRadius: "8px",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: "fantasy" }}
                  >
                    Item To Trade
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: "100%",
                      margin: "0 auto",
                    }}
                  >
                    <ProductCard
                      item={productDetail}
                      isDisable
                      cardType="trade"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#FF204E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#FF204E",
                      },
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: 2,
                    borderRadius: "8px",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    textAlign={"center"}
                    sx={{ fontFamily: "fantasy" }}
                  >
                    Item You Have
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "calc(100% - 48px)",
                      width: "100%",
                    }}
                  >
                    {selectedProduct ? (
                      <ProductCard
                        item={selectedProduct}
                        isDisable
                        cardType="have"
                      />
                    ) : (
                      <AddItem onSelectProduct={handleSelectProduct} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
}
