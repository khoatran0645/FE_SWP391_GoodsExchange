import {
  Grid,
  Typography,
  Box,
  Container,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "../features/products/ProductCard";
import useStore from "../app/store";
import "/App.css";

export default function Home() {
  const getProductsForHomePage = useStore(
    (state) => state.getProductsForHomePage
  );
  const [page, setPage] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState({
    Electronics: false,
    "Art Supplies": false,
    "School Supplies": false,
  });
  const [sortValue, setSortValue] = useState("Name Ascending");

  useEffect(() => {
    getProductsForHomePage(page, 12);
  }, [page]);

  const productList = useStore((state) => state.productList);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilters({
      ...categoryFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const filterAndSortProducts = () => {
    if (productList?.data?.items) {
      let filteredProducts = [...productList.data.items];

      // Apply category filters
      const activeCategories = Object.keys(categoryFilters).filter(
        (key) => categoryFilters[key]
      );
      if (activeCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          activeCategories.includes(product.categoryName)
        );
      }

      // Apply sorting
      switch (sortValue) {
        case "Name Ascending":
          filteredProducts.sort((a, b) =>
            a.productName.localeCompare(b.productName)
          );
          break;
        case "Name Descending":
          filteredProducts.sort((a, b) =>
            b.productName.localeCompare(a.productName)
          );
          break;
        case "Price Ascending":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "Price Descending":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      return filteredProducts;
    }
    return [];
  };

  const getNewestProducts = () => {
    if (productList?.data?.items) {
      return productList.data.items
        .sort((a, b) => new Date(b.approveDate) - new Date(a.approveDate))
        .slice(0, 10);
    }
    return [];
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const filteredSortedProducts = filterAndSortProducts();
  const newestProducts = chunkArray(getNewestProducts(), 5);

  return (
    <>
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: "4px solid black",
          backgroundImage: "url('/background_newest_product2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxShadow: 8,
          // borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: "black",
            fontFamily: "'Libre Barcode 128 Text', cursive",
            fontSize: "5.5rem",
            fontWeight: 400,
          }}
          textAlign="center"
        >
          NEWEST PRODUCT
        </Typography>
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          {newestProducts.map((productGroup, index) => (
            <Box
              key={index}
              sx={{ display: "flex", justifyContent: "center", padding: 1 }}
            >
              {productGroup.map((product) => (
                <Box
                  key={product.productId}
                  sx={{ padding: 0.5, maxWidth: "15%" }}
                >
                  <ProductCard item={product} />
                </Box>
              ))}
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h5" fontFamily={"fantasy"} sx={{ mr: 4, mt: 1 }}>
          Category
        </Typography>
        <FormControlLabel
          sx={{
            mt: 0.7,
            mr: 6,
          }}
          control={
            <Checkbox
              checked={categoryFilters.Electronics}
              onChange={handleCategoryChange}
              name="Electronics"
            />
          }
          label="Electronics"
        />
        <FormControlLabel
          sx={{
            mt: 0.7,
            mr: 6,
          }}
          control={
            <Checkbox
              checked={categoryFilters["Art Supplies"]}
              onChange={handleCategoryChange}
              name="Art Supplies"
            />
          }
          label="Art Supplies"
        />
        <FormControlLabel
          sx={{
            mt: 0.7,
          }}
          control={
            <Checkbox
              checked={categoryFilters["School Supplies"]}
              onChange={handleCategoryChange}
              name="School Supplies"
            />
          }
          label="School Supplies"
        />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Container
            sx={{
              backgroundColor: "#f9f9f9",
              padding: 2,
              borderRadius: "8px",
              boxShadow: 1,
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              textAlign="center"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Sort By
            </Typography>
            <RadioGroup value={sortValue} onChange={handleSortChange}>
              <Typography variant="h6" fontFamily={"fantasy"}>
                Product Name
              </Typography>
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
              <Typography variant="h6" fontFamily={"fantasy"}>
                Product Price
              </Typography>
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

        <Grid item xs={10}>
          <Grid container spacing={1}>
            {filteredSortedProducts.length > 0 ? (
              filteredSortedProducts.map((item) => (
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
          <Stack spacing={2} alignItems="center" marginTop={5}>
            <Pagination
              count={productList?.data.totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
