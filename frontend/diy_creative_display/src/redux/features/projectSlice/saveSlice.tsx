import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status, SavePostValues } from "../../../types";

const initialState: Status & {
  savedPosts: SavePostValues[];
  isSaved: boolean;
} = {
  savedPosts: [],
  isSaved: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const savePosts = createAsyncThunk(
  "posts/savePost",
  async (postId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await base.post(
        `/post/${postId}/save`,
        null,
        authHeader()
      );
      console.log(response.data);
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

export const SavePostSlice = createSlice({
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
      state.isFetching = false;
      state.isSuccess = true;
      state.isSaved = action.payload.isSaved;

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

export const getSavedPosts = createAsyncThunk(
  "posts/fetchSavedPosts",
  async (nothing, { rejectWithValue }) => {
    try {
      const response = await base.get("/saves", authHeader());
      return response.data;
    } catch (error) {
      console.error("Error occurred while getting posts:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const FetchSavedPostsSlice = createSlice({
  name: "getSavedPosts",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    filterSavedPosts: (state, action: { payload: number }) => {
      state.savedPosts = state.isSuccess
        ? state.savedPosts.filter((post) => post.post_id !== action.payload)
        : state.savedPosts;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSavedPosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getSavedPosts.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.savedPosts = action.payload;

      return state;
    });
    builder.addCase(getSavedPosts.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState } = SavePostSlice.actions;
export const { filterSavedPosts } = FetchSavedPostsSlice.actions;
export const savePostReducer = SavePostSlice.reducer;
export const fetchSavedPostsReducer = FetchSavedPostsSlice.reducer;
