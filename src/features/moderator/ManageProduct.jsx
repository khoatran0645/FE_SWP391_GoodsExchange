import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import NavBarMo from "./NavBarMo";
import ModeratorPage from "./ModeratorPage";
import useStore from "../../app/store";

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

  const fetchData = async (currentPage) => {
    await postAllProduct(currentPage, 6);
    const productList = useStore.getState().productList;
    setTotalPage(productList.data.totalPage);
    setListProduct(productList.data.items);
  };

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleApprove = async (item) => {
    await approveProduct(item.productId, true);
    // Update the listProduct state to remove the approved product
    setListProduct((prevList) => {
      const newList = [...prevList]; // Create a copy of the array
      const index = newList.findIndex(
        (iter) => iter.productId === item.productId
      );
      if (index !== -1) {
        newList.splice(index, 1); // Remove the item from the copy
      }
      return newList;
    });
    toast.success("You've successfully approved"),
      {
        style: {
          marginTop: "50px",
        },
      };
    fetchData(page);
  };

  const handleDeny = async (item) => {
    await denyProduct(item.productId, false);
    // Update the listProduct state to remove the denied product
    setListProduct((prevList) => {
      const newList = [...prevList]; // Create a copy of the array
      const index = newList.findIndex(
        (iter) => iter.productId === item.productId
      );
      if (index !== -1) {
        newList.splice(index, 1); // Remove the item from the copy
      }
      return newList;
    });
    toast.success("You've successfully denied", {
      style: {
        marginTop: "50px",
      },
    });

    fetchData(page);
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
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <ModeratorPage />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 2,
            width: "100%",
            flexWrap: "wrap", // Allow cards to wrap to the next line if necessary
            paddingLeft: "300px",
          }}
        >
          {listProduct?.length === 0 && (
            <Typography variant="h6" fontFamily="Lucida Sans Unicode">
              Nothing to moderate yet.
            </Typography>
          )}
          {listProduct?.map((product) => (
            <Card
              key={product.productId}
              sx={{
                maxWidth: 320, // Set a larger fixed width for cards
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 470, // Set a minimum height to ensure content fits
              }}
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
                height="190" // Adjusted height
                image={product.productImageUrl}
                alt={product.productName}
              />
              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                  fontSize="1rem" // Adjusted font size
                >
                  {product.productName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop="20px"
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop="20px"
                  textAlign="center"
                  fontSize="1rem"
                  fontWeight="bold"
                >
                  Category: {product.categoryName}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 2, // Adjusted padding
                  paddingBottom: "10px", // Adjusted padding
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
        </Box>

        {listProduct?.length !== 0 && (
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
        )}

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
