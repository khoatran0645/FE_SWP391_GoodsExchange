import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Pagination,
} from "@mui/material";
import NavBarMo from "./NavBarMo";
import ModeratorPage from "./ModeratorPage";
import useStore from "../../app/store";
import { toast } from "react-toastify";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ManageProduct() {
  const [page, setPage] = React.useState(1);
  const postAllProduct = useStore((state) => state.postAllProduct);
  const approveProduct = useStore((state) => state.approveProduct);
  const denyProduct = useStore((state) => state.denyProduct);

  const [totalPage, setTotalPage] = React.useState(1);
  const [listProduct, setListProduct] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      await postAllProduct(page, 10);
      const productList = useStore.getState().productList;
      setTotalPage(productList.data.totalPage);
      setListProduct(productList.data.items);
    };
    fetchData();
  }, [page]);

  const handleApprove = async (item) => {
    await approveProduct(item, true);
    setListProduct(
      listProduct.filter((iter) => iter.productId !== item.productId)
    );
    toast.success("You've successfully approved");
  };

  const handleDeny = async (item) => {
    await denyProduct(item, false);
    setListProduct(
      listProduct.filter((iter) => iter.productId !== item.productId)
    );
    toast.success("You've successfully denied");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (action, item) => {
    setDialogContent({ action, item });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAction = () => {
    const { action, item } = dialogContent;
    if (action === "approve") {
      handleApprove(item);
    } else if (action === "deny") {
      handleDeny(item);
    }
    handleCloseDialog();
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

        {listProduct?.map((product) => (
          <Card
            key={product.productId}
            sx={{ maxWidth: 400, width: "100%", mb: 2 }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {product.userUpload[0]}
                </Avatar>
              }
              title={product.userUpload}
              subheader={product.uploadDate}
            />
            <CardMedia
              component="img"
              height="230"
              image={product.productImageUrl}
              alt={product.productName}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
                fontSize="1.25rem"
              >
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Category: {product.categoryName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
                fontSize="1.1rem"
              >
                {product.price} VND
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 6,
                paddingBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => handleOpenDialog("approve", product)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenDialog("deny", product)}
              >
                Deny
              </Button>
            </CardActions>
          </Card>
        ))}
        <Stack spacing={2} sx={{ marginTop: "20px" }}>
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContent.action === "approve"
                ? "Are you sure you want to approve this product?"
                : "Are you sure you want to deny this product?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button onClick={handleConfirmAction} color="primary" autoFocus>
                Yes
              </Button>
              <Button onClick={handleCloseDialog} color="primary">
                No
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
