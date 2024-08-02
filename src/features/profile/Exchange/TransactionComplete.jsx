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
import CreateRating from "../../rating/CreateRating";
import CreateReport from "../../report/CreateReport";
import TransactionYourProductCard from "./Card/TransactionYourProductCard";
import RequestProductExchangeCard from "./Card/RequestProductExchangeCard";
import dayjs from "dayjs";
import TransactionProductExchangCard from "./Card/TransactionProductExchangCard";

function TransactionComplete() {
  const getTransactionsCompleteList = useStore(
    (state) => state.getTransactionsCompleteList
  );
  const transactionCompleteData = useStore(
    (state) => state.transactionCompleteData
  );
  const userId = useStore((state) => state.userId);

  useEffect(() => {
    getTransactionsCompleteList(); // Call the API function when the component mounts
  }, []);

  const formatDate = (dateCreated) => {
    return dayjs(dateCreated).format("DD/MM/YYYY");
  };

  console.log("transactionCompleteData: ", transactionCompleteData);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h4" fontFamily={"fantasy"}>
                Transaction Complete
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Your Product</TableCell>
            <TableCell align="center">Product Exchange</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionCompleteData?.items?.length > 0 ? (
            transactionCompleteData.items.map((item) => (
              <TableRow key={item.transactionId}>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <TransactionYourProductCard
                    transaction={{
                      currentProductName:
                        item.exchangeRequest.currentProductName,
                      currentProductImage:
                        item.exchangeRequest.currentProductImage,
                      userImage: item.exchangeRequest.senderImage, // Example field, adjust as needed
                      userName: item.exchangeRequest.senderId === userId ? item.exchangeRequest.senderName : item.exchangeRequest.receiverName, // Example field, adjust as needed
                      date: formatDate(item.exchangeRequest.startTime),
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <TransactionProductExchangCard
                      transaction={{
                        targetProductName:
                          item.exchangeRequest.targetProductName,
                        tarProductImage:
                          item.exchangeRequest.targetProductImage,
                        userImage: item.exchangeRequest.receiverImage,
                        status: item.status, // Adjust as needed
                        receiverName: item.exchangeRequest.senderId !== userId ?item.exchangeRequest.senderName   : item.exchangeRequest.receiverName, // Adjust as needed
                        date: formatDate(item.exchangeRequest.startTime),
                      }}
                    />
                  </TableCell>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "#4CAF50", // Green background
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      display: "inline-block",
                      textAlign: "center",
                      textTransform: "uppercase", // Capitalizes text
                      cursor: "default", // Makes the text look like a button but not clickable
                    }}
                  >
                    {item.exchangeRequest.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <>
                      <CreateRating
                        targetId={
                          item.exchangeRequest.targetProductId
                        }
                      />
                      <CreateReport
                        targetId={
                          item.exchangeRequest.targetProductId
                        }
                      />
                    </>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {formatDate(item.exchangeRequest.startTime)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6">No Transaction</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionComplete;
