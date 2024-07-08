import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addDots } from "../../utils/helper";

export default function ProductCard({ item }) {
  const navigate = useNavigate();
  // console.log(item);

  return (
    <Card key={item.productId} sx={{ maxWidth: 345, minWidth: 200 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/products/${item.productId}`, { state: item });
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`${item.productImageUrl}?w=150&h=150&fit=crop&auto=format`}
          alt={item.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.productName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {addDots(item.price)} VND
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
};
