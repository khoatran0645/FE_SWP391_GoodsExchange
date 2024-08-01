import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function YourProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, border:"3px solid black", boxShadow: 5 }}>
      <Box
        component="div"
        onClick={() => navigate(`/products/${product.currentProductId}`)}
        sx={{
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          alt={product.currentProductName}
          height="140"
          image={product.currentProductImage}
        />
      </Box>
      <Divider sx={{ backgroundColor: "black", height: "2px" }} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1, // Adjust margin-bottom if needed
          }}
        >
          {product.currentProductName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar
              src={product.userImage}
              sx={{ width: 20, height: 20, marginRight: 1 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {product.senderName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
