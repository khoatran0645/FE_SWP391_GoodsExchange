import {
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function SortOptions({ sortValue, handleSortChange }) {
  return (
    <Container
      sx={{
        backgroundColor: "#f9f9f9",
        padding: 2,
        borderRadius: "8px",
        boxShadow: 1,
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        textAlign="center"
        sx={{ mb: 2, fontFamily: "fantasy" }}
      >
        SORT BY
      </Typography>
      <RadioGroup value={sortValue} onChange={handleSortChange}>
        <Typography variant="h6" fontFamily={"fantasy"}>
          Days
        </Typography>
        <FormControlLabel value="Newest" control={<Radio />} label="Newest" />
        <FormControlLabel value="Oldest" control={<Radio />} label="Oldest" />
        <Typography variant="h6" fontFamily={"fantasy"}>
          Product Name
        </Typography>
        <FormControlLabel
          value="Name Ascending"
          control={<Radio />}
          label="Name Ascending"
        />
        <FormControlLabel
          value="Name Descending"
          control={<Radio />}
          label="Name Descending"
        />
        <Typography variant="h6" fontFamily={"fantasy"}>
          Stars
        </Typography>
        <FormControlLabel
          value="Stars Ascending"
          control={<Radio />}
          label="Stars Ascending"
        />
        <FormControlLabel
          value="Stars Descending"
          control={<Radio />}
          label="Stars Descending"
        />
      </RadioGroup>
    </Container>
  );
}
