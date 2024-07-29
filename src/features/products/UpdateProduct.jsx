import { useState, useRef } from "react";
import { toast } from "react-toastify";

import {
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
} from "@mui/material";

import useStore from "../../app/store";
export default function UpdateProduct(props) {
  // console.log("props", props);
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const updateProduct = useStore((state) => state.updateProduct);
  const isLoading = useStore((state) => state.isLoading);
  const auth = useStore((state) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = useStore((state) => state.categories);
  // console.log("categories", categories);
  const options =
    categories?.data?.map((category) => ({
      key: category.categoryId,
      label: category.categoryName,
    })) || [];

  // console.log("options", options);

  return (
    <>
      {auth && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#FF204E",
            "&:hover": {
              backgroundColor: "#FF204E",
            },
          }}
        >
          Update product
        </Button>
      )}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: "80vh",
          },
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("ProductId", props.productId);
            const selectedCategory =
              autocompleteRef.current?.querySelector("input").value;
            const selectedOption = options.find(
              (option) => option.label === selectedCategory
            );


            const formJson = Object.fromEntries(formData.entries());
            formJson.CategoryId = selectedOption ? selectedOption.key : null;
            formData.append("CategoryId", formJson.CategoryId);

            console.log("data", formJson);

            useStore.setState({ response: null, error: null });
            // await updateProduct(formJson);
            const response = useStore.getState().response;
            const error = useStore.getState().error;
            console.log("response", response);
            console.log("error", error);
            if (!error) {
              toast.success("Update Successfully");
            } else {
              toast.error(error.message);
              // toast.error(error);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle>Update product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="ProductName"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="Description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <Autocomplete
            disablePortal
            id="autocomplete"
            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="standard"
                required
                ref={autocompleteRef}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isLoading}
            sx={{
              color: "white",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Cancel
          </Button>
          {(isLoading && <CircularProgress />) || (
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#FF204E",
                "&:hover": {
                  backgroundColor: "#FF204E",
                },
              }}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
