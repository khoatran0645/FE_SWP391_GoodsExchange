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

function ReceiveTrade() {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    getSellerProduct();
  }, []);
  const productDetail = useStore((state) => state.productDetail);
  const sellerProductList = useStore((state) => state.sellerProductList);
  const auth = useStore((state) => state.auth);
  // console.log("sellerProductList: ", sellerProductList?.data.items);
  //GET REECEIVE TRADE
  const { getReceiveList, getReceiveTradeData, isLoading, error } = useStore(
    (state) => ({
      getReceiveList: state.getReceiveList,
      getReceiveTradeData: state.getReceiveTradeData,
      isLoading: state.isLoading,
      error: state.error,
    })
  );
  const getProductById = useStore((state) => state.getProductById);

  useEffect(() => {
    getReceiveList(); // Call the API function when the component mounts
  }, [getReceiveList]);
  useEffect(() => {
    console.log("getReceiveTradeData:", getReceiveTradeData);
  }, [getReceiveTradeData]);
  // console.log("get product ID : ", getReceiveTradeData.targetProductId);

  // useEffect(() => {
  //  getProductById(getReceiveTradeData.targetProductId);
  // });
  // console.log("productDetail : ", productDetail);

  //APPROVE / DENY TRADE
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
  const handleShowPhoneNumber = async (targetProductId) => {
    if (auth) {
      await getProductById(targetProductId);
      setSelectedProductId(targetProductId);
      setShowPhoneNumber(true);
      setTimeout(() => {
        setShowPhoneNumber(false);
        setSelectedProductId(null);
        window.location.reload();
      }, 30000); // Reset after 30 seconds
    } else {
      navigate("/login");
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h6">Receive Details</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">My Product</TableCell>
            <TableCell align="center">Target&apos;s Product</TableCell>
            <TableCell align="center">Sender Avatar</TableCell>
            <TableCell align="center">Action</TableCell>
            {/* <TableCell align="center">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {getReceiveTradeData?.length > 0 ? (
            getReceiveTradeData?.map((item) => (
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

                {/* Sender&apos;s Product Image and Name */}
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
                    {item.status === "Created" ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApprove(item.exchangeRequestId)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CloseIcon />}
                          onClick={() => handleDeny(item.exchangeRequestId)}
                        >
                          Deny
                        </Button>
                      </>
                    ) : item.receiverStatus === 1 && item.senderStatus === 1 ? (
                      !showPhoneNumber ||
                      selectedProductId !== item.targetProductId ? (
                        <Button
                          onClick={() =>
                            handleShowPhoneNumber(item.targetProductId)
                          }
                          sx={{
                            backgroundColor: "white",
                            border: "1px solid black",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                          }}
                        >
                          Show phone number
                        </Button>
                      ) : (
                        <Typography sx={{ fontSize: 23 }}>
                          {productDetail?.data?.userPhoneNumber}
                        </Typography>
                      )
                    ) : item.receiverStatus === 1 && item.senderStatus === 2 ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApprove(item.exchangeRequestId)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CloseIcon />}
                          onClick={() => handleDeny(item.exchangeRequestId)}
                        >
                          Deny
                        </Button>
                      </>
                    ) : item.receiverStatus === 2 && item.senderStatus === 2 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckIcon />}
                        onClick={() => handleComplete(item.exchangeRequestId)}
                      >
                        Complete
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApprove(item.exchangeRequestId)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CloseIcon />}
                          onClick={() => handleDeny(item.exchangeRequestId)}
                        >
                          Deny
                        </Button>
                      </>
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

export default ReceiveTrade;
