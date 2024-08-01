import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  ImageList,
  ImageListItem,
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

export default function CreateNewProduct() {
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const createNewProduct = useStore((state) => state.createNewProduct);
  const isLoading = useStore((state) => state.isLoading);
  const auth = useStore((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState([]);
  // console.log("selectedFile", selectedFile);

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
          Post new product
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
            if (selectedFile.length > 0) {
              await createNewProduct(formData);
            } else {
              toast.error("Please upload at least one image");
              return;
            }
            const response = useStore.getState().response;
            const error = useStore.getState().error;
            console.log("response", response);
            console.log("error", error);
            if (!error) {
              setSelectedFile([]);
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
            sx={{
              marginTop: 1,
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Upload images
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile?.length > 0 && (
            <ImageList
              // sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {Array.from(selectedFile).map((item, index) => {
                const url = URL.createObjectURL(item);
                return (
                  <ImageListItem key={index} sx={{ width: 164, height: 164 }}>
                    <img src={url} alt={`file-${index}`} loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
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
