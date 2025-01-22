import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const token = localStorage.getItem("token"); 
    const response = await axios.get("http://localhost:2001/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:2001/api/products",
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:2001/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updatedProduct }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:2001/api/products/${id}`,
      updatedProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { id, updatedProduct } = action.payload; 
        const index = state.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...updatedProduct,
          };
        }
      });
  },
});

export default productSlice.reducer;
