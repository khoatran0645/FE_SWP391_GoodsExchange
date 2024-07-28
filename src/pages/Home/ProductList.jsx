import { Grid, Typography, Stack, Pagination } from "@mui/material";
import ProductCard from "../../features/products/ProductCard";

export default function ProductList({
  products,
  page,
  handleChangePage,
  totalPage,
}) {
  return (
    <Grid item xs={10}>
      <Grid container spacing={1}>
        {products.length > 0 ? (
          products.map((item) => (
            <Grid item key={item.productId} xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductCard item={item} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4">No Products</Typography>
        )}
      </Grid>
      <Stack spacing={2} alignItems="center" marginTop={5}>
        <Pagination
          count={totalPage || 1}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </Grid>
  );
}
