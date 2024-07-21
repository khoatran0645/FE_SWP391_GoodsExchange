import useStore from "../../app/store";
import {
  Grid,
  Typography,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function SearchProduct() {
  const searchResult = useStore((state) => state.searchResult);
  const [sortValue, setSortValue] = useState("Name Ascending");

  const sortProducts = () => {
    if (searchResult?.data?.items) {
      let sortedProducts = [...searchResult.data.items];
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

  const sortedProducts = sortProducts();

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Search Products
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2}>
          <Container sx={{ backgroundColor: "#EEEEEE", height: "100vh" }}>
            <Typography variant="h4" textAlign={"center"} marginTop={0.5}>
              Sort
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
            {sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <Grid
                  item
                  key={item.productId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  <ProductCard item={item}  />
                </Grid>
              ))
            ) : (
              <Typography variant="h4">No Product Found</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchProduct;
