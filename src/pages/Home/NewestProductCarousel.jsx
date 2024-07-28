import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "../../features/products/ProductCard";

export default function NewestProductCarousel({ newestProducts }) {
  return (
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
  );
}
