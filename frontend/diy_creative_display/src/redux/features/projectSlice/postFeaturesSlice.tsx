import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & {
  likesCount: Record<number, number>;
  isLiked: Record<number, boolean | {}>;
  post_id: number | null;
  user_ids: number[];
  user_id: number | null;
} = {
  likesCount: {},
  isLiked: {},
  post_id: null,
  user_ids: [],
  user_id: null,
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
      const postId = action.payload;
      const userId = state.user_id as number;

      // Toggle like status
      state.isLiked[postId] = !state.isLiked[postId] || false;

      // Check if the post is liked by the current user and add/remove userId accordingly
      if (state.isLiked[postId]) {
        if (!state.user_ids.includes(userId)) {
          state.user_ids.push(userId);
        }
      } else {
        state.user_ids = state.user_ids.filter((id) => id !== userId);
      }
    },
    resetIsLiked(
      state,
      action: { payload: { currentUserId: number; postId: number | undefined } }
    ) {
      const currentUserId = action.payload.currentUserId;
      const postId = action.payload.postId as number;
      if (!state.user_ids.includes(currentUserId)) {
        state.isLiked[postId] = false;
      } else {
        state.isLiked[postId] = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postLikes.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(postLikes.fulfilled, (state, action) => {
      const { post_id, likes_count, user_id } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.post_id = post_id;
      state.user_id = user_id;
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
export const { toggleClickedLike, resetIsLiked } = PostLikesSlice.actions;
export const postLikesReducer = PostLikesSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
export const updatePostReducer = UpdatePostSlice.reducer;
