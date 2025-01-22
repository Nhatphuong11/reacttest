import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch categories
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:2001/api/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Add category
export const addCategory = createAsyncThunk("categories/addCategory", async (newCategory) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:2001/api/categories", newCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Update category
export const updateCategory = createAsyncThunk("categories/updateCategory", async (category) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `http://localhost:2001/api/categories/${category.categoryid}`,
    { categoryName: category.categoryName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});

// Delete category
export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (categoryid) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:2001/api/categories/${categoryid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return categoryid;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((e) => e.categoryid === action.payload.categoryid);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((e) => e.categoryid !== action.payload);
      });
  },
});

export default categorySlice.reducer;
