import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {addUser} from '../redux/userSlice';


export const register = createAsyncThunk(
  "auth/register",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:2001/api/auth/register",
        user
      );
      dispatch(addUser(response.data.user));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error occurred");
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:2001/api/auth/login', user);
    const { token, role } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
