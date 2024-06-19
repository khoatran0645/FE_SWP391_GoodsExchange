import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import useStore from "../../app/store";

export default function ManageProduct() {
  const [page, setPage] = React.useState(1);
  const postAllProduct = useStore((state) => state.postAllProduct);
  const reviewProduct = useStore((state) => state.reviewProduct);

  const [listProduct, setListProduct] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await postAllProduct(page, 10);
      const productList = useStore.getState().productList;
      console.log("product", productList);
      setListProduct(productList.items);
    };
    fetchData();
  }, []);

  const handleApprove = async (item) => {
    await reviewProduct(item, true);
    const response = useStore.getState().response;
    if (response.isSuccessed) {
      setListProduct(
        listProduct.filter((iter) => iter.productId !== item.productId)
      );
    } else {
      console.log("Error");
    }
  };

  const handleDeny = async (item) => {
    await reviewProduct(item, false);
    const response = useStore.getState().response;
    if (response.isSuccessed) {
      setListProduct(
        listProduct.filter((iter) => iter.productId !== item.productId)
      );
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          width: "70%",
          flexFlow: "column",
        }}
      >
        <ModeratorPage />

        {listProduct?.map((product) => (
          <Paper
            key={product.productId}
            sx={{ p: 3, mb: 2, maxWidth: "500px" }}
          >
            <Typography variant="h6">{product.title}</Typography>
            <img
              style={{
                width: "100%",
              }}
              src={product.image}
              alt="img"
            />
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              {product.price} VND
            </Typography>
            <Typography variant="body1">{product.category}</Typography>
            <Typography variant="body1">ID: {product.productId}</Typography>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleApprove(product);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeny(product);
                }}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
