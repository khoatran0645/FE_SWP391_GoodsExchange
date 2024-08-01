import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Divider,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeMotion from "@mui/icons-material/AutoAwesomeMotion";
import dayjs from "dayjs"; // Import dayjs for date formatting

ProductCardForProfile.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};

const statusColors = {
  "Awaiting approval": "#FFC107", // Amber
  "Approved": "#4CAF50", // Green
  "Rejected": "#F44336", // Red
  "Hidden": "#9E9E9E", // Grey
  "Progressing Exchange": "#2196F3", // Blue
  "Exchange Successful": "#00BFAE", // Teal
};

export default function ProductCardForProfile({ item, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const iconStyle = {
    color: "#555",
    fontSize: "1.2rem",
    marginRight: 0.5,
  };

  // const formattedDate = dayjs(item?.createDate).format("DD/MM/YYYY");

  // Convert status to display format
  const formatStatus = (status) => {
    if (status === "Exchange is in progress") {
      return "Progressing Exchange";
    }
    // if (status === "Hidden") {
    //   return "Exchange Successful";
    // }
    return status;
  };

  const formattedStatus = formatStatus(item.status);
  const statusColor = statusColors[formattedStatus] || "#FFF";

  return (
    <Card
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
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
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
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {item.productName}
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mx: 1,
              }}
            >
              {formattedDate}
            </Typography>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <PersonIcon sx={iconStyle} />
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mx: 1,
              }}
            >
              {item.userUpload}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <AutoAwesomeMotion sx={iconStyle} />
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mx: 1,
              }}
            >
              {item.categoryName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: statusColors[formatStatus(item.status)] || "#FFF",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#FFF",
                fontWeight: "bold",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formatStatus(item.status)} 
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
