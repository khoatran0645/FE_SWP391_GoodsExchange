import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import NavBarMo from "./NavBarMo";
import ModeratorPage from "./ModeratorPage";
import useStore from "../../app/store";
import { toast } from "react-toastify";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({ CategoryName: "" });
  const [categoryToEdit, setCategoryToEdit] = useState({
    CategoryId: "",
    CategoryName: "",
  });
  const [error, setError] = useState("");

  const createCategory = useStore((state) => state.createCategory);
  const getAllCategories = useStore((state) => state.getAllCategories);
  const updateCategory = useStore((state) => state.updateCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);

  useEffect(() => {
    const getAllCategoriesOnInit = async () => {
      await getAllCategories();
      setCategories(useStore.getState().categories.data);
    };
    getAllCategoriesOnInit();
  }, []);

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddCategory = () => {
    setOpenAddDialog(true);
  };

  const handleSaveCategory = async () => {
    if (!/^[A-Za-z ]+$/.test(newCategory.CategoryName)) {
      setError("Category Name invalid");
      return;
    }
    setError("");
    try {
      await createCategory(newCategory);
      const response = useStore.getState().response;
      if (response) {
        setCategories([
          {
            ...response.data,
          },
          ...categories,
        ]);
        toast.success("Category added successfully", {
          style: {
            marginTop: "50px",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    }
    setOpenAddDialog(false);
    setNewCategory({ CategoryName: "" });
  };

  const handleCancelAddCategory = () => {
    setOpenAddDialog(false);
    setNewCategory({ CategoryName: "" });
    setError("");
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit({
      CategoryId: category.categoryId,
      CategoryName: category.categoryName,
    });
    setOpenEditDialog(true);
  };

  const handleUpdateCategory = async () => {
    if (!/^[A-Za-z ]+$/.test(categoryToEdit.CategoryName)) {
      setError("Category Name invalid.");
      return;
    }
    setError("");
    try {
      await updateCategory(categoryToEdit);
      const response = useStore.getState().response;
      if (response) {
        setCategories(
          categories.map((category) => {
            if (category.categoryId === categoryToEdit.CategoryId) {
              return {
                categoryId: category.categoryId,
                categoryName: categoryToEdit.CategoryName,
              };
            } else {
              return category;
            }
          })
        );
        toast.success("Update successful", {
          style: {
            marginTop: "50px",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    }
    setOpenEditDialog(false);
    setCategoryToEdit({ CategoryId: "", CategoryName: "" });
  };

  const handleConfirmDelete = async () => {
    await deleteCategory(categoryToDelete);
    const response = useStore.getState().response;
    if (response) {
      setCategories(
        categories.filter(
          (category) => category.categoryId !== categoryToDelete
        )
      );
      toast.success("Category deleted successfully", {
        style: {
          marginTop: "50px",
        },
      });
    }
    setOpenDeleteDialog(false);
  };

  const handleCancelEditCategory = () => {
    setOpenEditDialog(false);
    setCategoryToEdit({ CategoryId: "", CategoryName: "" });
    setError("");
  };

  return (
    <>
      <NavBarMo />
      <ModeratorPage />
      <Grid container justifyContent="center" marginLeft="200px">
        <Grid item xs={12} md={10}>
          <Box sx={{ p: 2, mt: 8 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              marginTop="10px"
              marginBottom="50px"
              fontFamily="Lucida Sans Unicode"
            >
              Manage Categories
            </Typography>
            <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "rgb(241, 86, 82)",
                }}
              >
                Add New Category
              </Button>
            </Grid>
            <Box
              sx={{
                maxWidth: "100%",
                mx: "auto",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ margin: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#1f1f1f" }}>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 100,
                          color: "white",
                          fontWeight: "bold",
                          padding: 2,
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 200,
                          color: "white",
                          fontWeight: "bold",
                          padding: 2,
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 150,
                          color: "white",
                          fontWeight: "bold",
                          padding: 2,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow
                        key={category.categoryId}
                        sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                      >
                        <TableCell align="center" sx={{ padding: 2 }}>
                          {category.categoryId}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: 2 }}>
                          {category.categoryName}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: 2 }}>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              sx={{ marginX: 1 }}
                              onClick={() => handleEditCategory(category)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="secondary"
                              sx={{ marginX: 1 }}
                              onClick={() => handleDelete(category.categoryId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={openAddDialog} onClose={handleCancelAddCategory}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newCategory.CategoryName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, CategoryName: e.target.value })
            }
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAddCategory}>Cancel</Button>
          <Button onClick={handleSaveCategory} sx={{ color: "green" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={openEditDialog} onClose={handleCancelEditCategory}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={categoryToEdit.CategoryName}
            onChange={(e) =>
              setCategoryToEdit({
                ...categoryToEdit,
                CategoryName: e.target.value,
              })
            }
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditCategory}>Cancel</Button>
          <Button onClick={handleUpdateCategory} sx={{ color: "green" }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
