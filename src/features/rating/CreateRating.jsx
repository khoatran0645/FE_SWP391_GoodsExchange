import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "../../app/store";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateRating({ targetId }) {
  const sendRatingFromBuyer = useStore((state) => state.sendRatingFromBuyer);
  const [numberStars, setNumberStars] = useState(5);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [feedback, setFeedback] = useState("");
  const auth = useStore((state) => state.auth);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    auth ? setOpen(true) : navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const feedback = formData.get("feedback");
    console.log("targetId: ", targetId, "feedback: ", feedback);
    const result = {
      feedback: feedback,
      productId: targetId,
      numberStars: numberStars,
    };
    try {
      const response = await sendRatingFromBuyer(result);
      console.log("Rating sent successfully:", response);
      if (response?.isSuccessed) {
        toast.success("Rating sent successfully.");
      }
      handleClose();
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Error sending report. Please try again later.");
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "green",
          color: "white",
          "&:hover": {
            backgroundColor: "green",
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
        <DialogTitle>Create Rating</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Controlled</Typography>
            <Rating
              name="simple-controlled"
              value={numberStars}
              onChange={(event, numberStars) => {
                setNumberStars(numberStars);
              }}
            />
          </Box>
          <TextField
            required
            margin="dense"
            id="feedback"
            name="feedback"
            label="Feedback"
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
