import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import { Box, Button, Paper, Typography } from "@mui/material";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ManageReports() {
  const [page, setPage] = React.useState(1);
  const getAllReports = useStore((state) => state.getAllReports);
  const approveReport = useStore((state) => state.approveReport);
  const denyReport = useStore((state) => state.denyReport);

  const [totalPage, setTotalPage] = React.useState(1);

  const [listReport, setListReport] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await getAllReports(page, 10);
      const reportList = useStore.getState().reportList;
      console.log("report", reportList);
      // setTotalPage(reportList.totalPage);
      setListReport(reportList.items);
    };
    fetchData();
  }, [page]);

  const handleApprove = async (item) => {
    await approveReport(item);
    const response = useStore.getState().response;
    console.log("response : ", response);
    if (response.isSuccessed || (response && response.data)) {
      setListReport(
        listReport.filter((iter) => iter.productId !== item.productId)
      );
    } else {
      console.log("Error");
    }
  };

  const handleDeny = async (item) => {
    await denyReport(item);
    const response = useStore.getState().response;
    if (response.isSuccessed) {
      setListReport(
        listReport.filter((iter) => iter.productId !== item.productId)
      );
    } else {
      console.log("Error");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          width: "70%",
          flexFlow: "column",
        }}
      >
        <ModeratorPage />

        {listReport?.map((item, index) => (
          <Paper key={index} sx={{ p: 3, mb: 2, minWidth: "500px" }}>
            <Typography variant="h6">{item.reason}</Typography>
            {/* <Typography variant="body1">{item.productId}</Typography> */}
            <Typography variant="body1">
              {item.reportMade} reported {item.reportReceived} for product name:{" "}
              {item.productName}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleApprove(item);
                }}
              >
                Ban
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeny(item);
                }}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 3 }}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Box>
    </>
  );
}
