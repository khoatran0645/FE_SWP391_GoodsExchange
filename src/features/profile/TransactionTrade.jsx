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

function TransactionTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();

  useEffect(() => {
    getSellerProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);

  console.log("sellerProductList: ", sellerProductList?.data.items);
  //GET REECEIVE TRADE
  const { getCancelRequestList, getCancelRequestListData, isLoading, error } =
    useStore((state) => ({
      getCancelRequestList: state.getCancelRequestList,
      getCancelRequestListData: state.getCancelTradeData,
      isLoading: state.isLoading,
      error: state.error,
    }));

  useEffect(() => {
    getCancelRequestList(); // Call the API function when the component mounts
  }, [getCancelRequestList]);
  console.log("getCancelRequestListData: ", getCancelRequestListData);

  const handleApprove = async (RequestTradeid) => {
    // Handle the approve action
    console.log("Approved RequestedChange:", RequestTradeid);
    await state.approveTrade(RequestTradeid);
    // Optionally, handle the response or error
    if (state.error) {
      console.error(state.error);
      // Handle the error, e.g., show a toast notification
    } else {
      console.log("Trade approved successfully:", state.response);
      // Handle the success, e.g., show a toast notification
    }
  };

  const handleDeny = async (productId) => {
    // Handle the deny action
    console.log("Denied product ID:", productId);
    await state.denyTrade(productId);
    if (state.error) {
      console.error(state.error);
      // Handle the error, e.g., show a toast notification
    } else {
      console.log("Trade approved successfully:", state.response);
      // Handle the success, e.g., show a toast notification
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h6">Trade Details</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Currently User Product</TableCell>
            <TableCell align="center">Currently User Product Name</TableCell>
            <TableCell align="center">Sender&apos;s Product</TableCell>
            <TableCell align="center">Sender&apos;s Product Name</TableCell>
            <TableCell align="center">Sender Avatar</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getCancelRequestListData?.length > 0 ? (
            getCancelRequestListData?.map((item) => (
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
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100"
                      width="100"
                      image={`${item.userImage}?w=100&h=100&fit=crop&auto=format`}
                      alt={item.targetProductName}
                      sx={{ objectFit: "contain", borderRadius: "8px" }}
                    />
                    <Typography>{item.senderName}</Typography>
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
                      // onClick={() => handleApprove(item.exchangeRequestId)}
                    >
                      Rating
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CloseIcon />}
                      // onClick={() => handleDeny(item.exchangeRequestId)}
                    >
                      Report
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
  );
}

export default TransactionTrade;
