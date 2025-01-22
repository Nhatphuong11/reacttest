import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy tất cả đơn hàng
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const token = localStorage.getItem("token"); 
  const response = await axios.get("http://localhost:2001/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

// Thêm đơn hàng
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (newOrder, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Token không tồn tại hoặc hết hạn.");
    }

    try {
      const response = await axios.post(
        "http://localhost:2001/api/orders",
        newOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Add order failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Xóa đơn hàng
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ orderId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Token không tồn tại hoặc hết hạn.");
    }

    try {
      await axios.delete(`http://localhost:2001/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { orderId };
    } catch (error) {
      console.error("Delete order failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:2001/api/orders/${id}/status`, 
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (err) {
      console.error("Update status failed:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);



const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { orderId } = action.payload;
        state.orders = state.orders.filter((order) => order.id !== orderId);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedOrder = action.payload; // API trả về đơn hàng đã cập nhật
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      })      
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
