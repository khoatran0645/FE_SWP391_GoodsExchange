import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";

import useStore from "../../app/store";

export default function CreateNewProduct() {
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const createNewProduct = useStore((state) => state.createNewProduct);

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
      <Button variant="contained" onClick={handleClickOpen}>
        Create new product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const selectedCategory =
              autocompleteRef.current?.querySelector("input").value;
            const selectedOption = options.find(
              (option) => option.label === selectedCategory
            );
            formJson.categoryId = selectedOption ? selectedOption.key : null;

            console.log(formJson);
            await createNewProduct(formJson);
            const response = useStore.getState().response;
            const error = useStore.getState().error;
            console.log(response);
            console.log(error);
            if (response?.isSuccessed){
              toast.success("Product created successfully. Please wait for Moderator approval.");
            }
            else{
              toast.error(response?.message);
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
            name="productName"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
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
          <TextField
            required
            margin="dense"
            id="imageURL"
            name="productImageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="https://via.placeholder.com/150"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
