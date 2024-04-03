import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status, UserLikedStatus, UserState } from "../../../types";

const initialState: Status & {
  likesCount: Record<number, number>;
  users: Record<number, UserState>;
  post_id: number | null;
} = {
  likesCount: {},
  users: {},
  post_id: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const postLikes = createAsyncThunk(
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
      // console.error("Error occurred while liking a post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const PostLikesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },

    toggleClickedLike(state, action) {
      // Action to toggle like status
      const { postId, currentUserId } = action.payload;

      // Initialize users if it doesn't exist
      if (!state?.users && !state?.users[currentUserId]) {
        state.users[currentUserId] = {
          isLiked: {},
        };
      }

      // Initialize isLiked for the postId if it doesn't exist
      if (!state?.users[currentUserId]?.isLiked[postId]) {
        state.users[currentUserId].isLiked[postId] = {
          liked: false,
        };
      }

      // Toggle like status
      state.users[currentUserId].isLiked[postId].liked =
        !state?.users[currentUserId]?.isLiked[postId]?.liked;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postLikes.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(postLikes.fulfilled, (state, action) => {
      const { post_id, likes_count } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.post_id = post_id;
      state.likesCount = {
        ...state.likesCount,
        [post_id]: likes_count,
      };

      return state;
    });
    builder.addCase(postLikes.rejected, (state, action) => {
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
      // console.error("Error occurred while deleting a post:", error);
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    payload: { formData: FormData; postId: number | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await base.put(
        `/post/${payload.postId}`,
        payload.formData,
        authHeader()
      );
      return response.data;
    } catch (error) {
      // console.error("Error occurred while updating a post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const UpdatePostSlice = createSlice({
  name: "updatePost",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updatePost.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updatePost.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState } = UpdatePostSlice.actions;
export const { toggleClickedLike } = PostLikesSlice.actions;
export const postLikesReducer = PostLikesSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
export const updatePostReducer = UpdatePostSlice.reducer;
