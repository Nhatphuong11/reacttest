import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPosts = createAsyncThunk(
  "products/fetchPosts",
  async () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.get("http://localhost:2001/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:2001/api/posts",
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:2001/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return postId;
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, updatedPost }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:2001/api/posts/${id}`,
      updatedPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload
        );
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const { id, updatedPost } = action.payload; 
        const index = state.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...updatedPost,
          };
        }
      });
  },
});

export default postSlice.reducer;
