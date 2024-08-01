import React, { useState, useEffect } from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";
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
import YourProductCard from "./Card/YourProductCard";
import ProductExchangeCard from "./Card/ProductExchangeCard";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ReceiveTrade = () => {
  const getSellerProduct = useStore((state) => state.getSellerProduct);
  const state = useStore();
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSellerProduct();
  }, [getSellerProduct]);

  const productDetail = useStore((state) => state.productDetail);
  const sellerProductList = useStore((state) => state.sellerProductList);
  const auth = useStore((state) => state.auth);

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

  // Handle approve action
  const handleApprove = async (RequestTradeid) => {
    console.log("Approved RequestedChange:", RequestTradeid);

    await state.approveTrade(RequestTradeid);
    if (state.error) {
      console.error(state.error);
    } else {
      console.log("Trade approved successfully:", state.response);
      toast.success("Trade approved successfully");

      // Handle the success, e.g., show a toast notification
    }
  };

  // Handle deny action
  const handleDeny = async (productId) => {
    console.log("Denied product ID:", productId);
    toast.success("Denied successfully");

    await state.denyTrade(productId);
    if (state.error) {
      console.error(state.error);
    } else {
      // console.log("Trade approved successfully:", state.response);
      toast.success("Trade deny successfully");
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

  const sortedReceiveListData = getReceiveTradeData
    ?.slice()
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  const formatDate = (dateCreated) => {
    return dayjs(dateCreated).format("DD/MM/YYYY");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h4" fontFamily={"fantasy"}>
                Receive Details
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ width: "20%" }}>
              Your Product
            </TableCell>
            <TableCell align="center" sx={{ width: "20%" }}>
              Product Exchange
            </TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedReceiveListData?.length > 0 ? (
            sortedReceiveListData.map((item) => (
              <TableRow key={item.productId}>
                {/* Your Product Card */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <YourProductCard product={item} />
                </TableCell>

                {/* Product Exchange Card */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <ProductExchangeCard product={item} />
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      color="error"
                      onClick={() => handleDeny(item.exchangeRequestId)}
                    >
                      <CloseIcon />
                    </Button>
                    <Button
                      color="success"
                      onClick={() => handleApprove(item.exchangeRequestId)}
                    >
                      <CheckIcon />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    {item.status === "Created" ? (
                      <>
                        {/* <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApprove(item.exchangeRequestId)}
                        >
                          Approve Request
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CloseIcon />}
                          onClick={() => handleDeny(item.exchangeRequestId)}
                        >
                          Deny
                        </Button> */}
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
                          Done transaction
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
                <TableCell align="center">
                  {formatDate(item.dateCreated)}
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
};

export default ReceiveTrade;
