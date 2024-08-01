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
import dayjs from "dayjs";
import { toast } from "react-toastify";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReceiveProductExchangeCard from "./Card/ReceiveProductExchangeCard";
import ReceiveYourProductCard from "./Card/ReceiveYourProductCard";

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
      console.log("Trade denied successfully:", state.response);
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

  console.log(sortedReceiveListData);

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
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedReceiveListData?.length > 0 ? (
            sortedReceiveListData.map((item) => (
              <TableRow key={item.currentProductId}>
                {/* YourProductCell */}

                <TableCell align="center" sx={{ width: "20%" }}>
                  <ReceiveYourProductCard product={item} />
                </TableCell>

                <TableCell align="center" sx={{ width: "20%" }}>
                  <ReceiveProductExchangeCard product={item} />
                </TableCell>

                {/* ProductExchangeCell */}

                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography>
                    {item.status === "Created" && (
                      <Typography>
                        Do you want to accept this trade with{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item.senderName}{" "}
                        </span>
                        ?
                      </Typography>
                    )}
                    {item.senderStatus === 1 &&
                      item.receiverStatus === 1 &&
                      "Exchange processing"}
                    {item.senderStatus === 2 && item.receiverStatus === 1 && (
                      <Typography>
                        Did you exchange this product with{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item.senderName}{" "}
                        </span>
                        ?
                      </Typography>
                    )}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={{ width: "20%" }}>
                  {item.status === "Created" && (
                    <>
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
                    </>
                  )}

                  {item.senderStatus === 1 && item.receiverStatus === 1 && (
                    <HourglassEmptyIcon sx={{ color: "black" }} />
                  )}

                  {item.senderStatus === 2 && item.receiverStatus === 1 && (
                    <>
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
                    </>
                  )}
                </TableCell>

                {/* DateCreatedCell */}
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
