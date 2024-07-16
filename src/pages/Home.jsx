import { Grid, ImageList, Typography } from "@mui/material";
import { useEffect } from "react";
import ProductCard from "../features/products/ProductCard";
import useStore from "../app/store";

export default function Home() {
  const getProductsForHomePage = useStore(
    (state) => state.getProductsForHomePage
  );

  useEffect(() => {
    getProductsForHomePage(1, 20);
  }, []);

  const productList = useStore((state) => state.productList);
  // console.log(productList?.data.items.length);

  // console.log(import.meta.env.VITE_BE_BASE_URL);

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Typography variant="h2" align="center">
          New Products
        </Typography>
      </Grid> */}

      <Grid item xs={12}>
        {/* <Container> */}
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}
        <ImageList
          sx={{ width: "100%" }}
          cols={5}
          // rowHeight={164}
        >
          {productList?.data.items.length > 0 ? (
            productList?.data.items.map((item) => (
              <ProductCard key={item.productId} item={item} />
            ))
          ) : (
            <Typography variant="h4">No Product</Typography>
          )}
        </ImageList>
        {/* </Box> */}
        {/* </Container> */}
      </Grid>
    </Grid>
  );
}
