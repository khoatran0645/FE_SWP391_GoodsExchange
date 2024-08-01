import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../app/store";

export default function RequestProductExchangeCard({ product }) {
  const navigate = useNavigate();
  const userId = useStore((state) => state.userId);

  return (
    <Card sx={{ maxWidth: 345, border: "3px solid black", boxShadow: 5 }}>
      <Box
        component="div" // Change from "button" to "div" to remove button styling
        onClick={() => navigate(`/products/${product.targetProductId}`)}
        sx={{
          cursor: "pointer", // Ensure the cursor indicates a clickable item
        }}
      >
        <CardMedia
          component="img"
          alt={product.targetProductName}
          height="140"
          image={
            userId !== product.senderId
              ? product.currentProductImage
              : product.targetProductImage
          }
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
          {userId !== product.senderId
            ? product.currentProductName
            : product.targetProductName}
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
            onClick={() => navigate("/profile-info")}
          >
            <Avatar
              src={product.userImage}
              sx={{ width: 20, height: 20, marginRight: 1 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {userId !== product.senderId
              ? product.senderName
              : product.receiverName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
