import { Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import NewestProductCarousel from "./NewestProductCarousel";
import CategoryFilter from "./CategoryFilter";
import SortOptions from "./SortOptions";
import ProductList from "./ProductList";
import useStore from "../../app/store";
import "/App.css";

export default function Home() {
  const getProductsForHomePage = useStore(
    (state) => state.getProductsForHomePage
  );
  const getAllCategories = useStore((state) => state.getAllCategories);
  const categories = useStore((state) => state.categories) || [];
  const productList = useStore((state) => state.productList);

  const [page, setPage] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState({});
  const [sortValue, setSortValue] = useState("Name Ascending");

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

  useEffect(() => {
    getProductsForHomePage(page, 12, categoryFilters);
  }, [page, categoryFilters]);

  console.log(productList);

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
        case "Newest":
          filteredProducts.sort(
            (a, b) => new Date(a.approveDate) - new Date(b.approveDate)
          );
          break;
        case "Oldest":
          filteredProducts.sort(
            (a, b) => new Date(b.approveDate) - new Date(a.approveDate)
          );
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
        case "Star Ascending":
          filteredProducts.sort(
            (a, b) => a.averageNumberStars - b.averageNumberStars
          );
          break;
        case "Star Descending":
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
      <NewestProductCarousel newestProducts={newestProducts} />
      <CategoryFilter
        categories={categories.data}
        categoryFilters={categoryFilters}
        handleCategoryChange={handleCategoryChange}
      />
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <SortOptions
            sortValue={sortValue}
            handleSortChange={handleSortChange}
          />
        </Grid>
        <ProductList
          products={filteredSortedProducts}
          page={page}
          handleChangePage={handleChangePage}
          totalPage={productList?.data?.totalPage}
        />
      </Grid>
    </>
  );
}
