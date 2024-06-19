import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import { Box, Button, Paper, Typography } from "@mui/material";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";

export default function ManageReports() {
  const getAllReports = useStore((state) => state.getAllReports);

  const [listReport, setReportsList] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await getAllReports();
      const reportList = useStore.getState().reportList;
      console.log("report", reportList);
      setReportsList(reportList);
    };
    fetchData();
  }, []);

  const onDenyClick = async (e) => {
    e.preventDefault();
    await setAuth();
    console.log("test", e);
    setReportsList(reportList.filter((item) => item.id !== reports.id));
  };

  return (
    <>
      <NavBarMo />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          width: "100%",
        }}
      >
        <ModeratorPage />

        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
          }}
        >
          {listReport?.items?.map((item) => (
            <Paper key={item.productId} sx={{ p: 3, mb: 2, minWidth: "500px" }}>
              <Typography variant="h6">{item.reason}</Typography>
              {/* <Typography variant="body1">{item.productId}</Typography> */}
              <Typography variant="body1">
                {item.reportMade} reported {item.reportReceived} for product
                name: {item.productName}
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
                    setReportsList(
                      listReport.filter((item) => item.id !== report.id)
                    );
                  }}
                >
                  Ban
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setReportsList(
                      listReport.filter((item) => item.id !== report.id)
                    );
                  }}
                >
                  Deny
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}
