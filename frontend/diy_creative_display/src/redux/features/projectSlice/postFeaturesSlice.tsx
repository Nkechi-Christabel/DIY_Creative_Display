import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & { likeCounts: number } = {
  likeCounts: 0,
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
  async (post_id: number, { rejectWithValue }) => {
    console.log("Backend id", post_id);
    try {
      const response = await base.post(
        `/post/${post_id}/like`,
        null,
        authHeader()
      );
      console.log(response.data);
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
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(likePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(likePosts.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.likeCounts = action.payload.likes_count;

      return state;
    });
    builder.addCase(likePosts.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        action.error.message ||
        (action.payload as { message?: string }).message ||
        "An error occurred, please try again";
    });
  },
});

// export const getAllPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await base.get("/posts");
//   return response.data;
// });

// export const FetchPostsSlice = createSlice({
//   name: "getPosts",
//   initialState,
//   reducers: {
//     clearState: (state) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isFetching = false;
//     },
//   },

//   extraReducers: (builder) => {
//     builder.addCase(getAllPosts.pending, (state) => {
//       state.isFetching = true;
//     });
//     builder.addCase(getAllPosts.fulfilled, (state, action) => {
//       state.isFetching = false;
//       state.isSuccess = true;

//       return state;
//     });
//     builder.addCase(getAllPosts.rejected, (state, action) => {
//       state.isFetching = false;
//       state.isError = true;
//       state.errorMessage =
//         action.error.message ||
//         (action.payload as { message?: string }).message ||
//         "An error occurred, please try again";
//     });
//   },
// });

export const { clearState } = likePostSlice.actions;
export const likePostReducer = likePostSlice.reducer;
// export const fetchPostsReducer = FetchPostsSlice.reducer;
