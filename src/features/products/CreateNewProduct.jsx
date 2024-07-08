import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CircularProgress } from "@mui/material";

import useStore from "../../app/store";

export default function CreateNewProduct() {
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const createNewProduct = useStore((state) => state.createNewProduct);
  const isLoading = useStore((state) => state.isLoading);
  const auth = useStore((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState([]);
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  return (
    <>
      {auth && (
        <Button variant="contained" onClick={handleClickOpen}>
          Create new product
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const selectedCategory =
              autocompleteRef.current?.querySelector("input").value;
            const selectedOption = options.find(
              (option) => option.label === selectedCategory
            );

            // console.log(selectedFile);
            Array.from(selectedFile).forEach((file) => {
              formData.append("Images", file);
            });

            const formJson = Object.fromEntries(formData.entries());
            formJson.CategoryId = selectedOption ? selectedOption.key : null;

            formData.append("CategoryId", formJson.CategoryId);
            console.log("data", formJson);

            useStore.setState({ response: null, error: null });
            await createNewProduct(formData);
            const response = useStore.getState().response;
            const error = useStore.getState().error;
            console.log("response", response);
            console.log("error", error);
            if (!error) {
              toast.success(
                "Product created successfully. Please wait for Moderator approval."
              );
            } else {
              toast.error(error.message);
              // toast.error(error);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle>Create new product</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
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
          <TextField
            required
            margin="dense"
            id="price"
            name="Price"
            label="Price"
            type="number"
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
          {/* <TextField
            required
            margin="dense"
            id="imageURL"
            name="productImageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="https://via.placeholder.com/150"
          /> */}
          <Button
            component="label"
            // role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          {(isLoading && <CircularProgress />) || (
            <Button type="submit">Submit</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
