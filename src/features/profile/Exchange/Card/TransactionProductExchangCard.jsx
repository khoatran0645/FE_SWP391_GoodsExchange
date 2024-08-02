import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function TransactionProductExchangCard({ transaction }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, border: "3px solid black", boxShadow: 5 }}>
      <Box
        // component="div"
        // onClick={() => navigate(`/transactions/${transaction.id}`)}
        // sx={{
        //   cursor: "pointer",
        // }}
      >
        <CardMedia
          component="img"
          alt={transaction.targetProductName}
          height="140"
          image={transaction.tarProductImage}
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
            mb: 1,
          }}
        >
          {transaction.targetProductName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1, // Adjust margin-top if needed
          }}
        >
          <Avatar
            src={transaction.userImage}
            sx={{ width: 20, height: 20, marginRight: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {transaction.receiverName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
