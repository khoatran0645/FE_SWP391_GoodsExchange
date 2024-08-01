import React, { useEffect } from "react";
import useStore from "../../../app/store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import CreateRating from "../../rating/CreateRating";
import CreateReport from "../../report/CreateReport";
import RequestProductExchangeCard from "./Card/RequestProductExchangeCard";
import RequestYourProductCard from "./Card/RequestYourProductCard";
import dayjs from "dayjs";

function TransactionComplete() {
  const getTransactionsCompleteList = useStore((state) => state.getTransactionsCompleteList);
  const transactionCompleteData = useStore((state) => state.transactionCompleteData);
  const userId = useStore((state) => state.userId);

  useEffect(() => {
    getTransactionsCompleteList(); // Call the API function when the component mounts
  }, []);

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
            transactionCompleteData.items.map((item) => {
              return (
                <TableRow key={item.transactionId}>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <RequestYourProductCard
                      product={{
                        productName: item.exchangeRequest.currentProductName,
                        productImage: item.exchangeRequest.currentProductImage,
                        productDescription: item.exchangeRequest.currentProductDescription,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <RequestProductExchangeCard
                      product={{
                        productName: item.exchangeRequest.targetProductName,
                        productImage: item.exchangeRequest.targetProductImage,
                        productDescription: item.exchangeRequest.targetProductDescription,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.exchangeRequest.status}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <>
                        <CreateRating
                          targetId={
                            userId !== item.exchangeRequest.senderId
                              ? item.exchangeRequest.currentProductId
                              : item.exchangeRequest.targetProductId
                          }
                        />
                        <CreateReport
                          targetId={
                            userId !== item.exchangeRequest.senderId
                              ? item.exchangeRequest.currentProductId
                              : item.exchangeRequest.targetProductId
                          }
                        />
                      </>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{formatDate(item.exchangeRequest.startTime)}</TableCell>
                </TableRow>
              );
            })
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

export default TransactionComplete;
