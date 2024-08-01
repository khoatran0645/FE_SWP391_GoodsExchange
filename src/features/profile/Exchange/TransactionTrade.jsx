import React from "react";
import useStore from "../../../app/store";
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
import CreateRating from "../../rating/CreateRating";
import CreateReport from "../../report/CreateReport";
import YourProductCard from "./Card/YourProductCard";
import ProductExchangeCard from "./Card/ProductExchangeCard";

function TransactionTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();

  useEffect(() => {
    getSellerProduct();
  }, []);

  const sellerProductList = useStore((state) => state.sellerProductList);
  const userId = useStore((state) => state.userId);

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
              <Typography variant="h6">Transaction Details</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Your Product</TableCell>

            <TableCell align="center">Product Exchange</TableCell>

            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getCancelRequestListData?.length > 0 ? (
            getCancelRequestListData?.map((item) => (
              <TableRow key={item.productId}>
                {/* Currently User Product Image and Name */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <YourProductCard product={item} />
                </TableCell>

                {/* target's Product Image and Name */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <ProductExchangeCard product={item} />
                </TableCell>

                <TableCell align="center">
                  {/* <Box
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
                  </Box> */}
                </TableCell>

                <TableCell>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    {item.status === "Complete" ? (
                      <>
                        <CreateRating
                          targetId={
                            userId !== item.senderId
                              ? item.currentProductId
                              : item.targetProductId
                          }
                        />
                        <CreateReport
                          targetId={
                            userId !== item.senderId
                              ? item.currentProductId
                              : item.targetProductId
                          }
                        />
                      </>
                    ) : item.status === "Cancelled" ? (
                      <Button
                        variant="contained"
                        color="error"
                        // startIcon={<CloseIcon />}
                        // onClick={() => handleCancel(item.exchangeRequestId)}
                      >
                        Cancelled
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="warning"
                        // startIcon={<CloseIcon />}
                        // onClick={() => handleDeny(item.exchangeRequestId)}
                      >
                        Pending
                      </Button>
                    )}
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
