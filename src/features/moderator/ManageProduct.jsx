import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import useStore from "../../app/store";

export default function ManageProduct() {
  const [page, setPage] = React.useState(1);
  const postAllProduct = useStore((state) => state.postAllProduct);

  const listProduct = useStore.getState().productList;

  const [productList, setProductList] = React.useState([]);
  const [productDoneList, setProductDoneList] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await postAllProduct(page, 10);
      const productList = useStore.getState().productList;
      setProductList(productList.items.filter((item) => !item.isApproved));
      setProductDoneList(productList.items.filter((item) => item.isApproved))
    };
    fetchData();
  }, [page, postAllProduct]);

  const setAuth = useStore((state) => state.setAuth);
  const onDenyClick = async (e) => {
    e.preventDefault();
    await setAuth();
    console.log("test", e);
    setProductList(productList.filter((item) => item.id !== product.id));
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

        {productList?.map((item) => (
          <Paper key={item.productId} sx={{ p: 3, mb: 2, maxWidth: "500px" }}>
            <Typography variant="h6">{item.productName}</Typography>
            <img
              style={{
                width: "100%",
              }}
              src={item.productImageUrl}
              alt="img"
            />
            <Typography variant="body1">{item.description}</Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              {item.price} VND
            </Typography>
            <Typography variant="body1">Author: {item.userUpload}</Typography>
            <Typography variant="body1">
              Date created: {item.uploadDate}
            </Typography>
            <Typography variant="body1">
              Name of category: {item.categoryName}
            </Typography>

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
                onClick={() => onApproveClick(item)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDenyClick(item)}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
        <Typography variant="h6">Done</Typography>

        {productDoneList?.map((item) => (
          <Paper key={item.productId} sx={{ p: 3, mb: 2, maxWidth: "500px" }}>
            <Typography variant="h6">{item.productName}</Typography>
            <img
              style={{
                width: "100%",
              }}
              src={item.productImageUrl}
              alt="img"
            />
            <Typography variant="body1">{item.description}</Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              {item.price} VND
            </Typography>
            <Typography variant="body1">Author: {item.userUpload}</Typography>
            <Typography variant="body1">
              Date created: {item.uploadDate}
            </Typography>
            <Typography variant="body1">
              Name of category: {item.categoryName}
            </Typography>

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
                onClick={() => onApproveClick(item)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDenyClick(item)}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
        <Pagination
          count={10}
          page={page}
          color="secondary"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
