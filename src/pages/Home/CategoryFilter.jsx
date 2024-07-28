import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";

export default function CategoryFilter({
  categories,
  categoryFilters,
  handleCategoryChange,
}) {
  return (
    <>
      <Typography
        variant="h4"
        fontFamily={"fantasy"}
        sx={{ mt: 3, mb: 1, textAlign: "center" }}
      >
        CATEGORY
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          borderTop: "3px groove black",
          borderBottom: "3px groove black",
        }}
      >
        {categories?.map((category, index) => (
          <FormControlLabel
            key={category.categoryId}
            sx={{ mr: index === categories.length - 1 ? 0 : 10 }}
            control={
              <Checkbox
                checked={categoryFilters[category.categoryName] || false}
                onChange={handleCategoryChange}
                name={category.categoryName}
              />
            }
            label={category.categoryName}
          />
        ))}
      </Box>
    </>
  );
}
