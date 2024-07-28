import React from "react";
import useStore from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  Box,
  CardMedia,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";

function InventoryTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();

  useEffect(() => {
    getSellerProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);

  console.log("sellerProductList: ", sellerProductList?.data.items);
  return (
    <>
      {/* <Sidebar /> */}

      <Grid item xs={12} md={8}>
        <Grid item xs={10}>
          <Grid container spacing={1}>
            {sellerProductList?.data?.items.length > 0 ? (
              sellerProductList?.data?.items.map((item) => (
                <Grid
                  item
                  key={item.productId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  {/* <ProductCard item={item} /> */}
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
                      // disabled={isDisable}
                      onClick={() => {
                        navigate(`/products/${item.productId}`, {
                          state: item,
                        });
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
                        <Button
                          variant="contained"
                          href="#contained-buttons"
                          sx={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.isActive ? " success" : "On Going"}
                        </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h4">No Products</Typography>
            )}
          </Grid>
          {/* <Stack spacing={2} alignItems="center" marginTop={5}>
              <Pagination
                count={productList?.data.totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack> */}
        </Grid>
      </Grid>
    </>
  );
}

export default InventoryTrade;