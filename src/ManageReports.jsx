import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import { Box, Button, Paper, Typography } from "@mui/material";
import NavBarMo from "./NavBarMo";
import useStore from "../../app/store";

const reports = [
  {
    id: 1,
    title: "Report 1",
    description: "Description of Report 1",
    userName: "User 1",
    reportType: "Spam",
    affectedUser: "User 2",
  },
  {
    id: 2,
    title: "Report 2",
    description: "Description of Report 2",
    userName: "User 2",
    reportType: "Inappropriate",
    affectedUser: "User 3",
  },
  {
    id: 3,
    title: "Report 3",
    description: "Description of Report 3",
    userName: "User 3",
    reportType: "Inappropriate",
    affectedUser: "User 4",
  },
];
export default function ManageReports() {
  //call API
  //   const getReports = useStore(state);
  const getAllReports = useStore((state) => state.getAllReports);

//   console.log(getAllReports);

  React.useEffect(() => {
    getAllReports();
  }, []);

  const reportList = useStore((state) => state.reportList);
  console.log("report", reportList);

  const [listReport, setReportsList] = React.useState(reports);
  // const [listReport, setReportsList] = React.useState(getAllReports());

  const [reportDoneList, setReportDoneList] = React.useState([]);
  const setAuth = useStore((state) => state.setAuth);
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
          {reportList?.items.map((item) => (
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
                    setReportDoneList([...reportDoneList, report]);
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
                    setReportDoneList([...reportDoneList, report]);
                  }}
                >
                  Deny
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
        <Typography variant="h6">Done</Typography>

        {reportDoneList.map((report) => (
          <Paper key={report.id} sx={{ p: 3, mb: 2, minWidth: "500px" }}>
            <Typography variant="h6">{report.title}</Typography>
            <Typography variant="body1">{report.description}</Typography>
            <Typography variant="body1">
              {report.userName} reported {report.affectedUser} for{" "}
              {report.reportType}
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
                onClick={onDenyClick}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
