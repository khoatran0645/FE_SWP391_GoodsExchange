import React from "react";
import { Box } from "@mui/material";

const ProductImage = ({ src, alt }) => {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        overflow: "hidden",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    </Box>
  );
};

export default ProductImage;
