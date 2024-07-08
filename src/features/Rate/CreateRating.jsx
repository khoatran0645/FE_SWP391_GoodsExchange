import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import useStore from "../../app/store";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function CreateReport() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const sendRatingFromBuyer = useStore((state) => state.sendRatingFromBuyer);
  const [value, setValue] = React.useState(2);
  console.log("numberStart : ", value);
  const [hover, setHover] = React.useState(-1);
  const productDetail = useStore((state) => state.productDetail);

  const [checkBoxValues, setCheckBoxValues] = useState({
    scam: false,
    duplicate: false,
    sold: false,
    noContact: false,
    incorrectInfo: false,
    fake: false,
    damaged: false,
    other: false,
  });
  const [checkboxError, setCheckboxError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckBoxValues({
      scam: false,
      duplicate: false,
      sold: false,
      noContact: false,
      incorrectInfo: false,
      fake: false,
      damaged: false,
      other: false,
    });
    setCheckboxError(false);
  };

  const handleCheckboxChange = (event) => {
    setCheckBoxValues({
      ...checkBoxValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Object.values(checkBoxValues).some((value) => value)) {
      setCheckboxError(true);
    } else {
      setCheckboxError(false);
      const formData = new FormData(event.currentTarget);

      const selectedReasons = Object.keys(checkBoxValues)
        .filter((key) => checkBoxValues[key])
        .join(", ");

      const description = formData.get("description");
      const combinedReasons = `${selectedReasons} | ${description}`;

      const result = {
        // receiverId: productDetail?.data.userUploadId,
        numberStars: value,
        feedback: combinedReasons,
        productId: location.state.productId,
      };

      try {
        const response = await sendRatingFromBuyer(result);
        console.log("Rating sent successfully:", response);

        if (response?.isSuccessed) {
          toast.success("Rating sent successfully.");
        }
        // else {
        //   toast.error(response?.message || "Failed to send report.");
        // }

        handleClose();
      } catch (error) {
        console.error("Error sending report:", error);
        toast.error("Error sending report. Please try again later.");
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "red",
          color: "#ffffff",
          marginBottom: 2.5,
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        Rating
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Rate</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>

          <FormControl component="fieldset" error={checkboxError} required>
            <FormLabel component="legend">Is there any problem?</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="scam"
                    checked={checkBoxValues.scam}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Scam"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="duplicate"
                    checked={checkBoxValues.duplicate}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Duplicate"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="sold"
                    checked={checkBoxValues.sold}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Stuff Already Sold"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="noContact"
                    checked={checkBoxValues.noContact}
                    onChange={handleCheckboxChange}
                  />
                }
                label="No Contact"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="incorrectInfo"
                    checked={checkBoxValues.incorrectInfo}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Incorrect Information"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="fake"
                    checked={checkBoxValues.fake}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Fake Stuff"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="damaged"
                    checked={checkBoxValues.damaged}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Item Damaged"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="other"
                    checked={checkBoxValues.other}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Other Reason"
              />
            </FormGroup>
            {checkboxError && (
              <FormHelperText>
                Please select at least one reason.
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
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
