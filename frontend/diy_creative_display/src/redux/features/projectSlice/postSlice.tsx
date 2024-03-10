import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & { posts: CreatePostValues[] } = {
  posts: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const createPost = createAsyncThunk(
  "posts/createPosts",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await base.post("/post", payload, authHeader());
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

export const CreatePostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        action.error.message ||
        (action.payload as { message?: string }).message ||
        "An error occurred, please try again";
    });
  },
});

export const getAllPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await base.get("/posts");
  return response.data;
});

export const FetchPostsSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.posts = action.payload;

      return state;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        action.error.message ||
        (action.payload as { message?: string }).message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState } = CreatePostSlice.actions;
export const createPostReducer = CreatePostSlice.reducer;
export const fetchPostsReducer = FetchPostsSlice.reducer;
