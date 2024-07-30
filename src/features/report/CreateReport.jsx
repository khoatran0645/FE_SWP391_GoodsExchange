import { useNavigate } from "react-router-dom";
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
import useStore from "../../app/store";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateReport(targetId) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const sendReportFromBuyer = useStore((state) => state.sendReportFromBuyer);
  const auth = useStore((state) => state.auth);
  const navigate = useNavigate();
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
    auth ? setOpen(true) : navigate("/login");
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
        reason: combinedReasons,
        productId: targetId,
      };

      try {
        const response = await sendReportFromBuyer(result);
        console.log("Report sent successfully:", response);

        if (response?.isSuccessed) {
          toast.success("Report sent successfully.");
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
