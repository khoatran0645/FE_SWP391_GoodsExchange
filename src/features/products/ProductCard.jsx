import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dayjs from "dayjs"; // Import dayjs for date formatting

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  isDisable: PropTypes.bool,
  onSelect: PropTypes.func,
  cardType: PropTypes.oneOf(["trade", "have"]).isRequired,
};

export default function ProductCard({
  item,
  isDisable = false,
  onSelect,
  cardType,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDisable && onSelect) {
      onSelect(cardType, item);
    } else {
      navigate(`/products/${item.productId}`, { state: item });
    }
  };

  const iconStyle = {
    color: "#555",
    fontSize: "1.2rem",
    marginRight: 0.5,
  };

  // Format the approved date
  const formattedDate = dayjs(item.approvedDate).format("DD/MM/YYYY");

  return (
    <Card
      key={item.productId}
      sx={{
        maxWidth: 345,
        minWidth: 200,
        marginX: 1,
        marginY: 1,
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: isDisable ? "none" : "scale(1.03)",
          boxShadow: isDisable ? "none" : "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea disabled={isDisable} onClick={handleClick}>
        <Box
          sx={{
            position: "relative",
            border: "10px solid transparent",
            borderImage: "url(border_image.png) 180 round",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={`${item.productImageUrl}?w=150&h=150&fit=crop&auto=format`}
            alt={item.productName}
            sx={{
              objectFit: "cover",
            }}
          />
        </Box>
        <Divider sx={{ borderBottomWidth: 2, borderColor: "GrayText" }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: "600",
              color: "#333",
              textAlign: "left",
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
              mb: 1,
              gap: 0.5,
            }}
          >
            <PersonIcon sx={iconStyle} />
            <Typography
              variant="body2"
              sx={{
                color: "#555",
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
              mb: 1,
              gap: 0.5,
            }}
          >
            <AutoAwesomeMotionIcon sx={iconStyle} />
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.categoryName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              gap: 0.5,
            }}
          >
            <ThumbUpIcon sx={iconStyle} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="read-only"
                value={item ? item.averageNumberStars : 0}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                ({item ? item.averageNumberStars : 0})
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
