import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import useStore from "../../app/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

export default function ManageProduct() {
  const [page, setPage] = React.useState(1);
  const postAllProduct = useStore((state) => state.postAllProduct);
  const approveProduct = useStore((state) => state.approveProduct);
  const denyProduct = useStore((state) => state.denyProduct);

  const [totalPage, setTotalPage] = React.useState(1);

  const [listProduct, setListProduct] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await postAllProduct(page, 10);
      const productList = useStore.getState().productList;
      console.log("product", productList);
      setTotalPage(productList.totalPage);
      setListProduct(productList.items);
    };
    fetchData();
  }, [page]);

  const handleApprove = async (item) => {
    await approveProduct(item, true);
    const response = useStore.getState().response;
    console.log("response",response);
    if (response.isSuccessed) {
      setListProduct(
        listProduct.filter((iter) => iter.productId !== item.productId)
      );
      toast.success("You've successfully approved");
    } else {
      console.log("Error");
    }
  };

  const handleDeny = async (item) => {
    await denyProduct(item, false);
    const response = useStore.getState().response;

    if (response.isSuccessed) {
      setListProduct(
        listProduct.filter((iter) => iter.productId !== item.productId)
      );
      toast.success("You've successfully denied");
    } else {
      console.log("Error");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
            <Typography variant="h6">{product.productName}</Typography>
            <img
              style={{
                width: "100%",
              }}
              src={product.productImageUrl}
              alt="img"
            />

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              {product.price} VND
            <Typography variant="body1">{product.description}</Typography>
            </Typography>
            <Typography variant="body1">Created by: {product.userUpload}</Typography>
            <Typography variant="body1">Upload date: {product.uploadDate}</Typography>
            {/* <Typography variant="body1">{product.approvedDate}</Typography> */}
            <Typography variant="body1">Category name: {product.categoryName}</Typography>
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
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 3 }}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Box>
    </>
  );
}
