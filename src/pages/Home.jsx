import {
  Grid,
  Typography,
  RadioGroup,
  Container,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../features/products/ProductCard";
import useStore from "../app/store";

export default function Home() {
  const getProductsForHomePage = useStore(
    (state) => state.getProductsForHomePage
  );

  useEffect(() => {
    getProductsForHomePage(1, 20);
  }, [getProductsForHomePage]);

  const productList = useStore((state) => state.productList);
  const [sortValue, setSortValue] = useState("Name Ascending");

  const sortProducts = () => {
    if (productList?.data?.items) {
      let sortedProducts = [...productList.data.items];
      switch (sortValue) {
        case "Name Ascending":
          sortedProducts.sort((a, b) =>
            a.productName.localeCompare(b.productName)
          );
          break;
        case "Name Descending":
          sortedProducts.sort((a, b) =>
            b.productName.localeCompare(a.productName)
          );
          break;
        case "Price Ascending":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "Price Descending":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      return sortedProducts;
    }
    return [];
  };

  useEffect(() => {
    sortProducts();
  }, [sortValue, productList]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={2}>
        <Container sx={{ backgroundColor: "#EEEEEE", height: "100vh" }}>
          <Typography variant="h4" textAlign={"center"} marginTop={0.5}>
            Sort By
          </Typography>
          <RadioGroup
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
          >
            <FormControlLabel
              value="Name Ascending"
              control={<Radio />}
              label="Name Ascending"
            />
            <FormControlLabel
              value="Name Descending"
              control={<Radio />}
              label="Name Descending"
            />
            <FormControlLabel
              value="Price Ascending"
              control={<Radio />}
              label="Price Ascending"
            />
            <FormControlLabel
              value="Price Descending"
              control={<Radio />}
              label="Price Descending"
            />
          </RadioGroup>
        </Container>
      </Grid>

      <Grid item xs={12} lg={10}>
        <Grid container spacing={2}>
          {sortProducts().length > 0 ? (
            sortProducts().map((item) => (
              <Grid
                item
                key={item.productId}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <ProductCard item={item} />
              </Grid>
            ))
          ) : (
            <Typography variant="h4">No Products</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
