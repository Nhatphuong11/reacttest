/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy danh sách người dùng
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:2001/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : "Server error");
    }
  }
);

// Cập nhật người dùng
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:2001/api/users/${user.id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : "Server error");
    }
  }
);

// Cập nhật vai trò người dùng
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:2001/api/users/${userId}/role`, // Sử dụng backtick để format chuỗi
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : "Server error");
    }
  }
);
// Xóa người dùng
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:2001/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { userId }; 
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : "Server error");
    }
  }
);

const userSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    status: "idle", 
    updateStatus: "idle", 
    deleteStatus: "idle", 
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload); 
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    updateRole(state, action) {
      const { userId, newRole } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.role = newRole; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const userId = action.payload.userId;
        state.users = state.users.filter((user) => user.id !== userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { addUser, setUsers, updateRole } = userSlice.actions;
export default userSlice.reducer;
