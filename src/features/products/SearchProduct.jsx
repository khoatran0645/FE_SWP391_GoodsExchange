import React from "react";
import useStore from "../../app/store";
import {
  Grid,
  Typography,
  Container,
  Box,
  ImageList,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
function SearchProduct() {
  const navigate = useNavigate();
  const searchResult = useStore((state) => state.searchResult);
  console.log(searchResult);
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Search Products
        </Typography>
      </Grid>
      <ImageList
        sx={{ width: "100%" }}
        cols={5}
        // rowHeight={164}
      >
        {searchResult?.items.map((item) => (
          <Card key={item.productId} sx={{ maxWidth: 345, minWidth: 200 }}>
            <CardActionArea
              onClick={() => {
                navigate(`products/${item.productId}`, { state: item });
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
                  {item.price} VND
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </ImageList>
    </>
  );
}

export default SearchProduct;
