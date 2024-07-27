import React from "react";
import useStore from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import ProductImage from "./productImage";

const RequestTrade = () => {
  const getSellerProduct = useStore((state) => state.getSellerProduct);

  const getRequestProduct = useStore((state) => state.getRequestList);

  useEffect(() => {
    getSellerProduct();
    getRequestProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);
  const requestList = useStore((state) => state.getRequestListData);
  console.log("sellerProductList: ", sellerProductList?.data.items);
  console.log(
    "sellerProductList: ",
    sellerProductList?.data.items.productImageUrl
  );
  console.log("requestList: ", requestList?.data.items);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Typography variant="h6">Trade Details</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Currently User Product</TableCell>
              <TableCell>Currently User Product Name</TableCell>
              <TableCell>Sender's Product</TableCell>
              <TableCell>Sender's Product Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sellerProductList?.data?.items.length > 0 ? (
              sellerProductList?.data?.items.map((item) => (
                <TableRow key={item.productId}>
                  {/* Currently User Product Image and Name */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="120" // Adjust as needed
                        width="120" // Adjust as needed
                        image={`${item.productImageUrl}?w=50&h=50s&fit=crop&auto=format`}
                        alt={item.productName}
                        sx={{ objectFit: "contain", borderRadius: "8px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          mt: 1,
                        }}
                      >
                        {item.productName}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Sender's Product Image and Name */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="120px" // Adjust as needed
                        image={`${item.productImageUrl}?w=50&h=50&fit=crop&auto=format`}
                        alt={item.productName}
                        sx={{ objectFit: "contain", borderRadius: "8px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          mt: 1,
                        }}
                      >
                        {item.productName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                      }}
                    >
                      {item.userUpload}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="h6">No Products</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RequestTrade;
