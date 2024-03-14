import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & {
  likes: Record<number, number>;
  isLiked: Record<number, boolean | {}>;
} = {
  likes: {},
  isLiked: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const likePosts = createAsyncThunk(
  "posts/likePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await base.post(
        `/post/${postId}/like`,
        null,
        authHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred during signup:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const likePostSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLiked = {};
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    toggleLike(state, action: { payload: number }) {
      // Action to toggle like status
      const postId = action.payload;
      state.isLiked[postId] = !state.isLiked[postId] || false; // Toggle or set to false if not existing
    },
  },

  extraReducers: (builder) => {
    builder.addCase(likePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(likePosts.fulfilled, (state, action) => {
      const { post_id, likes_count } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.likes = {
        ...state.likes,
        [post_id]: likes_count,
      };

      return state;
    });
    builder.addCase(likePosts.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const deletePost = createAsyncThunk(
  "posts/deletePosts",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await base.delete(`/post/${postId}`, authHeader());
      return response.data;
    } catch (error) {
      console.error("Error occurred during signup:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const DeletePostSlice = createSlice({
  name: "deletePost",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState, toggleLike } = likePostSlice.actions;
export const likePostReducer = likePostSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
