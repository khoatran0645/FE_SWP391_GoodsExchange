import { Box } from "@mui/material";
import ProductCardForProfile from "./ProductCardForProfile";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselProductForProfilePage({ sellerProductList }) {
  const itemsPerPage = 6;

  const paginateProducts = (products, itemsPerPage) => {
    const pages = [];
    for (let i = 0; i < products.length; i += itemsPerPage) {
      pages.push(products.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const paginatedProducts = paginateProducts(
    sellerProductList?.data?.items || [],
    itemsPerPage
  );

  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      {paginatedProducts.map((productGroup, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
          }}
        >
          {productGroup.map((product) => (
            <Box
              key={product.productId}
              sx={{
                maxWidth: "15%",
                margin: "1rem",
                marginLeft: "1rem"
              }}
            >
              <ProductCardForProfile item={product} />
            </Box>
          ))}
        </Box>
      ))}
    </Carousel>
  );
}
