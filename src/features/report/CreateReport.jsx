import { useState } from "react";
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

export default function CreateReport() {
  const [open, setOpen] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if at least one checkbox is selected
    if (!Object.values(checkBoxValues).some((value) => value)) {
      setCheckboxError(true);
    } else {
      setCheckboxError(false);
      const formData = new FormData(event.currentTarget);
      Object.keys(checkBoxValues).forEach((key) => {
        if (checkBoxValues[key]) {
          formData.append("reason", key);
        }
      });
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      handleClose();
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "red",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        Report
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Report</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" error={checkboxError} required>
            <FormLabel component="legend">Is there any problem ?</FormLabel>
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
          <TextField
            required
            margin="dense"
            id="imageURL"
            name="imageURL"
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
