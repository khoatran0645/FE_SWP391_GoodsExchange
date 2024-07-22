import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  isDisable: PropTypes.bool,
};

export default function ProductCard({ item, isDisable = false }) {
  const navigate = useNavigate();

  return (
    <Card
      key={item.productId}
      sx={{
        maxWidth: 345,
        minWidth: 200,
        marginX: 0.5,
        marginY: 0.5,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea
        disabled={isDisable}
        onClick={() => {
          navigate(`/products/${item.productId}`, { state: item });
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`${item.productImageUrl}?w=150&h=150&fit=crop&auto=format`}
          alt={item.productName}
          sx={{
            objectFit: "cover",
            borderBottom: "1px solid #ddd",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.productName}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: "#ff5722",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {item.price} VND
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
