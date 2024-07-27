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
  CardMedia,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const RequestTrade = () => {
  const getSellerProduct = useStore((state) => state.getSellerProduct);

  useEffect(() => {
    getSellerProduct();
  }, [getSellerProduct]);

  // const sellerProductList = useStore((state) => state.sellerProductList);
  // console.log("sellerProductList: ", sellerProductList?.data.items);

  const { getRequestList, getRequestTradeData, isLoading, error } = useStore(
    (state) => ({
      getRequestList: state.getRequestList,
      getRequestTradeData: state.getRequestTradeData,
      isLoading: state.isLoading,
      error: state.error,
    })
  );
  const { getReceiveList, getReceiveTradeData, isLoading2, error2 } = useStore(
    (state) => ({
      getReceiveList: state.getReceiveList,
      getReceiveTradeData: state.getReceiveTradeData,
      isLoading: state.isLoading,
      error: state.error,
    })
  );

  useEffect(() => {
    getRequestList(); // Call the API function when the component mounts
  }, [getRequestList]);
  console.log("getRequestTradeData: ", getRequestTradeData);

  const handleApprove = (productId) => {
    // Handle the approve action
    console.log("Approved product ID:", productId);
  };

  const handleDeny = (productId) => {
    // Handle the deny action
    console.log("Denied product ID:", productId);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <Typography variant="h6">Trade Details</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Currently User Product</TableCell>
              <TableCell>Currently User Product Name</TableCell>
              <TableCell>Sender's Product</TableCell>
              <TableCell>Sender's Product Name</TableCell>
              <TableCell>userImage</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRequestTradeData?.length > 0 ? (
              getRequestTradeData?.map((item) => (
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
                        height="120"
                        width="120"
                        image={`${item.currentProductImage}?w=120&h=120&fit=crop&auto=format`}
                        alt={item.currentProductName}
                        sx={{ objectFit: "contain", borderRadius: "8px" }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        mt: 1,
                        ml: 1,
                      }}
                    >
                      {item.currentProductName}
                    </Typography>
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
                        height="120"
                        width="120"
                        image={`${item.targetProductImage}?w=120&h=120&fit=crop&auto=format`}
                        alt={item.targetProductName}
                        sx={{ objectFit: "contain", borderRadius: "8px" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        mt: 1,
                        ml: 1,
                      }}
                    >
                      {item.targetProductName}
                    </Typography>
                  </TableCell>

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
                        height="120"
                        width="120"
                        image={`${item.userImage}?w=120&h=120&fit=crop&auto=format`}
                        alt={item.targetProductName}
                        sx={{ objectFit: "contain", borderRadius: "8px" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => handleApprove(item.productId)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<CloseIcon />}
                        onClick={() => handleDeny(item.productId)}
                      >
                        Deny
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
