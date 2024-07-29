import * as React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Stack,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import NavBarMo from "./NavBarMo";
import ModeratorPage from "./ModeratorPage";
import useStore from "../../app/store";

export default function ManageReports() {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [listReport, setListReport] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [actionType, setActionType] = React.useState("");

  const getAllReports = useStore((state) => state.getAllReports);
  const approveReport = useStore((state) => state.approveReport);
  const denyReport = useStore((state) => state.denyReport);

  const fetchData = async () => {
    await getAllReports(page, 10);
    const reportList = useStore.getState().reportList;
    console.log("report", reportList);
    setTotalPage(reportList.totalPage);
    setListReport(reportList.data.items);
  };

  React.useEffect(() => {
    fetchData();
  }, [page]);

  const handleApprove = async () => {
    await approveReport(selectedReport);
    const response = useStore.getState().response;
    fetchData();
    toast.success("You've successfully approved"),
      {
        style: {
          marginTop: "50px",
        },
      };
    handleCloseDialog();
  };

  const handleDeny = async () => {
    await denyReport(selectedReport);
    const response = useStore.getState().response;
    if (response?.data) {
      fetchData();
      toast.success(response?.message || "You've successfully denied"),
        {
          style: {
            marginTop: "50px",
          },
        };
    } else {
      toast.error("Error");
    }
    handleCloseDialog();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (item, action) => {
    setSelectedReport(item);
    setActionType(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    if (actionType === "approve") {
      handleApprove();
    } else if (actionType === "deny") {
      handleDeny();
    }
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
          marginLeft: "200px",
        }}
      >
        <ModeratorPage />
        {listReport?.length === 0 && (
          <Typography variant="h6" fontFamily="Lucida Sans Unicode">
            Empty
          </Typography>
        )}
        {listReport?.map((item, index) => (
          <Paper key={index} sx={{ p: 3, mb: 2, minWidth: "500px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {item.reportMade[0]}
                </Avatar>
              }
              title={item.reportMade}
              subheader={item.uploadDate}
            />
            <CardMedia
              component="img"
              height="190" // Adjusted height
              image={item?.productImages[0]?.imagePath}
              alt={item.productName}
            />
            <Typography variant="h6">To: {item.reportReceived}</Typography>
            <Typography variant="body1">Reason: {item.reason}</Typography>
            <Typography variant="body1">Product: {item.productName}</Typography>

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
                onClick={() => handleOpenDialog(item, "approve")}
              >
                Ban
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenDialog(item, "deny")}
              >
                Deny
              </Button>
            </Box>
          </Paper>
        ))}
        {listReport?.length !== 0 && (
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
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {actionType === "approve" ? "Ban Confirmation" : "Deny Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionType === "approve"
              ? "Are you sure you want to ban this report?"
              : "Are you sure you want to deny this report?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
