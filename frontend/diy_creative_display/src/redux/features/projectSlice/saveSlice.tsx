import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const savePosts = createAsyncThunk(
  "posts/likePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await base.post(
        `/post/${postId}/save`,
        null,
        authHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred during save:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const savePostSlice = createSlice({
  name: "savePost",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(savePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(savePosts.fulfilled, (state, action) => {
      const { post_id, likes_count } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(savePosts.rejected, (state, action) => {
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

export const { clearState } = savePostSlice.actions;
export const savePostReducer = savePostSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
