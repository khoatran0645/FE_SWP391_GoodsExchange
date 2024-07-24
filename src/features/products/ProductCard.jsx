import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";

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
        marginX: 1,
        marginY: 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        borderRadius: 2,
        overflow: "hidden",
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
            variant="h6"
            component="div"
            sx={{
              fontWeight: "600",
              color: "#333",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {item.productName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              gap: 0.5,
            }}
          >
            <PersonIcon sx={{ color: "#555" }} />
            <Typography
              variant="body2"
              component="div"
              sx={{
                color: "#555",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.userUpload}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              gap: 0.5,
            }}
          >
            <GradeIcon sx={{ color: "#555" }} />
            <Typography
              variant="body2"
              component="div"
              sx={{
                color: "#555",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              5
            </Typography>
          </Box>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: "#ff5722",
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            {item.price} VND
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
