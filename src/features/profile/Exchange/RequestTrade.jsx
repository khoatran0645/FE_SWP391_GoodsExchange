import React, { useEffect } from "react";
import useStore from "../../../app/store";
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
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import dayjs from "dayjs";
import ProductExchangeCard from "./Card/ProductExchangeCard";
import YourProductCard from "./Card/YourProductCard";

const RequestTrade = () => {
  const state = useStore();

  const { getRequestList, getRequestListData, isLoading, error } = useStore(
    (state) => ({
      getRequestList: state.getRequestList,
      getRequestListData: state.getRequestListData,
      isLoading: state.isLoading,
      error: state.error,
    })
  );

  useEffect(() => {
    getRequestList(); // Call the API function when the component mounts
  }, [getRequestList]);

  // Handle approve action
  const handleApprove = async (RequestTradeid) => {
    console.log("Approved RequestedChange:", RequestTradeid);
    await state.approveTrade(RequestTradeid);
    if (state.error) {
      console.log(state.error);
      // Handle the error, e.g., show a toast notification
    } else {
      console.log("Trade approved successfully:", state.response);
      // Handle the success, e.g., show a toast notification
    }
  };

  // Handle deny action
  const handleDeny = async (productId) => {
    console.log("Denied product ID:", productId);
    await state.denyTrade(productId);
    if (state.error) {
      console.error(state.error);
      // Handle the error, e.g., show a toast notification
    } else {
      console.log("Trade denied successfully:", state.response);
      // Handle the success, e.g., show a toast notification
    }
  };

  // Format date
  const formatDate = (dateCreated) => {
    return dayjs(dateCreated).format("DD/MM/YYYY");
  };

  // Sort data by createDate in descending order
  const sortedRequestListData = getRequestListData
    ?.slice()
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h4" fontFamily={"fantasy"}>
                Request Details
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
          {sortedRequestListData?.length > 0 ? (
            sortedRequestListData.map((item) => (
              <TableRow key={item.currentProductId}>
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
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<HourglassEmptyIcon />}
                      >
                        Pending
                      </Button>
                    ) : item.receiverStatus === 1 && item.senderStatus === 1 ? (
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<HourglassEmptyIcon />}
                      >
                        Pending
                      </Button>
                    ) : item.receiverStatus === 2 && item.senderStatus === 2 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckIcon />}
                      >
                        Complete
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(item.exchangeRequestId)}
                        startIcon={<CheckIcon />}
                      >
                        Approve
                      </Button>
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

export default RequestTrade;
