import { Gradient } from "@mui/icons-material";
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
  LinearProgress,
} from "@mui/material";
import * as React from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const data = [
    {
      id: "1",
      title: "pen",
      price: "5.000",
      rating: "4.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image: "https://m.media-amazon.com/images/I/71XmnK4NmXL._AC_SL1500_.jpg",
    },
    {
      id: "2",
      title: "eraser",
      price: "2.000",
      rating: "3",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image: "https://m.media-amazon.com/images/I/716YBLPCc7L.jpg",
    },
    {
      id: "3",
      title: "phone",
      price: "20.000.000",
      rating: "1.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image:
        "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg",
    },
    {
      id: "4",
      title: "papers",
      price: "50.000",
      rating: "3.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iure quasi quae facere hic ipsum perferendis voluptas ad excepturi, ipsam rem nemo a. Corporis eaque, facilis ipsa ipsum quis atque?",
      image:
        "https://www.themandarin.com.au/wp-content/uploads/2022/12/journal-articles-papers.jpg?w=795",
    },
    {
      id: "5",
      title: "fan",
      price: "175.000",
      rating: "3.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",
      image:
        "https://m.media-amazon.com/images/I/81PL5OvB13L._AC_UF894,1000_QL80_DpWeblab_.jpg",
    },
    {
      id: "6",
      title: "charger",
      price: "250.000",
      rating: "3.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image:
        "https://m.media-amazon.com/images/I/61NfFCwsneL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "7",
      title: "wifi router",
      price: "500.000",
      rating: "3.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image: "https://m.media-amazon.com/images/I/51R2a9p-vNL._AC_SL1000_.jpg",
    },
    {
      id: "8",
      title: "wallet",
      price: "50.000",
      rating: "3.5",
      numberOfReviews: "667",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image:
        "https://m.media-amazon.com/images/I/71SPlw9sSUL._AC_UY1000_DpWeblab_.jpg",
    },
    {
      id: "9",
      title: "headphones",
      price: "100.000",
      rating: "3.5",
      numberOfReviews: "123",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image:
        "https://m.media-amazon.com/images/I/41tp0JPPlmL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "10",
      title: "macbook",
      price: "100.000.000",
      rating: "3.5",
      numberOfReviews: "123",
      nameOfPoster: "Thanh",
      phoneOfPoster: "0909999900",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit architecto quibusdam vero, harum, dicta eaque ea, esse cum temporibus unde porro! Autem, aspernatur repellat dolores excepturi voluptate ipsa eum laboriosam.",

      image:
        "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
    },
  ];

  return (
    <Grid container sx={{
      // backgroundImage: "linear-gradient(to right, #373B44, #c471ed, #f64f59)"
      alignItems:"center", justifyContent:"center",
    }}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          New Posts
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{}}>
        {/* <Container> */}
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}
        <ImageList
          sx={{ width: "100%" }}
          cols={6}
          // rowHeight={164}
        >
          {data.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 200, minWidth: 200 }}>
              <CardActionArea
                onClick={() => {
                  navigate(`products/${item.id}`, { state: item });
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${item.image}?w=100&h=100&fit=crop&auto=format`}
                  alt="laptop"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
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
        {/* </Box> */}
        {/* </Container> */}
      </Grid>
    </Grid>
  );
}
