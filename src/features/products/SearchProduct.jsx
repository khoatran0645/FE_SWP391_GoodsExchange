import useStore from "../../app/store";
import { Grid, Typography, ImageList } from "@mui/material";

import ProductCard from "./ProductCard";
function SearchProduct() {
  const searchResult = useStore((state) => state.searchResult);
  console.log(searchResult);
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Search Products
        </Typography>
      </Grid>
      <ImageList
        sx={{ width: "100%" }}
        cols={5}
        // rowHeight={164}
      >
        {searchResult > 0 ? (
          searchResult?.items?.map((item) => (
            <ProductCard key={item.productId} item={item} />
          ))
        ) : (
          <Typography variant="h4">No Product Found</Typography>
        )}
      </ImageList>
    </>
  );
}

export default SearchProduct;
