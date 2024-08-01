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
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import dayjs from "dayjs";
import RequestProductExchangeCard from "./Card/RequestProductExchangeCard";
import RequestYourProductCard from "./Card/RequestYourProductCard";

import { toast } from "react-toastify";

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
      toast.success("Approved RequestChange");
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

  console.log(sortedRequestListData);

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
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRequestListData?.length > 0 ? (
            sortedRequestListData.map((item) => (
              <TableRow key={item.currentProductId}>
                {/* YourProductCell */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <RequestYourProductCard product={item} />
                </TableCell>

                {/* ProductExchangeCell */}
                <TableCell align="center" sx={{ width: "20%" }}>
                  <RequestProductExchangeCard product={item} />
                </TableCell>

                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography>
                    {item.status === "Created" && (
                      <Typography>
                        Waiting for{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item.receiverName}{" "}
                        </span>
                        to accept this trade
                      </Typography>
                    )}
                    {item.senderStatus === 1 && item.receiverStatus === 1 && (
                      <Typography>
                        Did you exchange this product with{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item.receiverName}{" "}
                        </span>
                        ?
                      </Typography>
                    )}
                    {item.senderStatus === 2 && item.receiverStatus === 1 && (
                      <Typography>
                        Waiting for{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item.receiverName}{" "}
                        </span>
                        confirm !
                      </Typography>
                    )}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={{ width: "20%" }}>
                  {item.status === "Created" && (
                    <HourglassEmptyIcon sx={{ color: "black" }} />
                  )}

                  {item.senderStatus === 1 && item.receiverStatus === 1 && (
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

                  {item.senderStatus === 2 && item.receiverStatus === 1 && (
                    <HourglassEmptyIcon sx={{ color: "black" }} />
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

export default RequestTrade;
