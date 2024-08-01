import {
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import useStore from "../../app/store";
import SortOptions from "../../pages/Home/SortOptions";
import CategoryFilter from "../../pages/Home/CategoryFilter";

function SearchProduct() {
  const getAllCategories = useStore((state) => state.getAllCategories);
  const categories = useStore((state) => state.categories) || [];
  const searchResult = useStore((state) => state.searchResult);
  const [page, setPage] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [sortValue, setSortValue] = useState("Newest");

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories?.data) {
      setCategoryFilters(
        categories.data.reduce((acc, category) => {
          acc[category.categoryName] = false;
          return acc;
        }, {})
      );
    }
  }, [categories]);

  console.log("categories", categories);

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
    if (searchResult?.data?.items) {
      let filteredProducts = [...searchResult.data.items];

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
        case "Newest":
          filteredProducts.sort(
            (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
          );
          break;
        case "Oldest":
          filteredProducts.sort(
            (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)
          );
          break;
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
        case "Stars Ascending":
          filteredProducts.sort(
            (a, b) => a.averageNumberStars - b.averageNumberStars
          );
          break;
        case "Stars Descending":
          filteredProducts.sort(
            (a, b) => b.averageNumberStars - a.averageNumberStars
          );
          break;
        default:
          break;
      }

      return filteredProducts;
    }
    return [];
  };

  const getNewestProducts = () => {
    if (searchResult?.data?.items) {
      return searchResult.data.items
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
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
      <Typography
        variant="h3"
        fontFamily={"fantasy"}
        textAlign={"center"}
        sx={{ mb: "1rem" }}
      >
        SEARCH PRODUCT
      </Typography>
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
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <CategoryFilter
            categories={categories.data}
            categoryFilters={categoryFilters}
            handleCategoryChange={handleCategoryChange}
          />
        </Grid>
        <Grid item xs={2}>
          <SortOptions
            sortValue={sortValue}
            handleSortChange={handleSortChange}
          />
        </Grid>

        <Grid item lg={10}>
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
              count={searchResult?.data.totalPage || 1}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchProduct;
