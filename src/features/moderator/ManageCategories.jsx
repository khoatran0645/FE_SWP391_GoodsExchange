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

  const createCategory = useStore((state) => state.createCategory);
  const getAllCategories = useStore((state) => state.getAllCategories);
  const updateCategory = useStore((state) => state.updateCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);

  useEffect(() => {
    const getAllCategoriesOnInit = async () => {
      await getAllCategories();
    };
    getAllCategoriesOnInit();
    setCategories(useStore.getState().categories.data);
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
    try {
      await createCategory(newCategory);
      const response = useStore.getState().response;
      console.log(response.data);
      if (response) {
        setCategories([
          {
            ...response.data,
          },
          ...categories,
        ]);
        toast.success("Bạn đã add categories thành công", {
          style: {
            marginTop: "50px",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm danh mục thất bại");
    }
    setOpenAddDialog(false);
    setNewCategory({ CategoryName: "" });
  };

  const handleCancelAddCategory = () => {
    setOpenAddDialog(false);
    setNewCategory({ CategoryName: "" });
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit({
      CategoryId: category.categoryId,
      CategoryName: category.categoryName,
    });
    setOpenEditDialog(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategory(categoryToEdit);
      const response = useStore.getState().response;
      if (response) {
        console.log(response);
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
        toast.success("Bạn đã update thành công", {
          style: {
            marginTop: "50px",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật danh mục thất bại");
    }
    setOpenEditDialog(false);
    setCategoryToEdit({ CategoryId: "", CategoryName: "" });
  };

  const handleConfirmDelete = async () => {
    await deleteCategory(categoryToDelete);
    const response = useStore.getState().response;
    if (response) {
      console.log(response);
      setCategories(
        categories.filter(
          (category) => category.categoryId !== categoryToDelete
        )
      );
      toast.success("You've successfully delete", {
        style: {
          marginTop: "50px", // Adjust the value as needed
        },
      });
    }
    setOpenDeleteDialog(false);
  };

  const handleCancelEditCategory = () => {
    setOpenEditDialog(false);
    setCategoryToEdit({ CategoryId: "", CategoryName: "" });
  };

  return (
    <>
      <NavBarMo />
      <ModeratorPage />
      <Grid container justifyContent="center" marginLeft="150px">
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 2, mt: 8 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              marginTop="10px"
              marginBottom="25px"
              marginLeft="50px"
            >
              Manage Categories
            </Typography>
            <Grid container justifyContent="end" sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                startIcon={<AddIcon />}
              >
                Add New Category
              </Button>
            </Grid>
            <Box
              sx={{
                maxWidth: "100%",
                mx: "auto",
                marginLeft: "20px",
              }} // Changed marginLeft to shift the table 50px to the right
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        ID
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "200px" }}>
                        Name
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "150px" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.categoryId}>
                        <TableCell align="center">
                          {category.categoryId}
                        </TableCell>
                        <TableCell align="center">
                          {category.categoryName}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditCategory(category)}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(category.categoryId)}
                          >
                            <DeleteIcon />
                          </IconButton>
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
          <Button onClick={handleConfirmDelete} color="secondary">
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
            value={newCategory.categoryName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, categoryName: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAddCategory}>Cancel</Button>
          <Button onClick={handleSaveCategory} color="primary">
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditCategory}>Cancel</Button>
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
