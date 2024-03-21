import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentReducerValues, CommentValues, Status } from "../../../types";

const initialState: Status & {
  comments: CommentValues[];
} = {
  comments: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const base = axios.create({
  baseURL: baseUrlApi,
});

export const postComment = createAsyncThunk(
  "posts/postComment",
  async (payload: CommentReducerValues, { rejectWithValue }) => {
    try {
      const response = await base.post(
        `/post/${payload.postId}/comment`,
        { content: payload.content },
        authHeader()
      );
      return response.data;
    } catch (error) {
      // console.error("Error occurred while adding comment:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const PostCommentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        // action.error.message
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const getComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await base.get(`/post/${postId}/comments`);
      return response.data;
    } catch (error) {
      // console.error("Error occurred while fetching comments:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const FetchCommentsSlice = createSlice({
  name: "fetchComments",
  initialState,
  reducers: {
    fetchCommentsClearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    filterComments: (state, action: { payload: number }) => {
      state.comments = state.isSuccess
        ? state.comments.filter((comment) => comment.id !== action.payload)
        : state.comments;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },

    updateCommentOpenState: (state, action) => {
      const commentId = action.payload;
      const updatedComments = state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, isOpen: !comment.isOpen }
          : comment
      );
      state.comments = updatedComments;
    },
    updatedComment: (state, action: { payload: CommentValues }) => {
      const update = state.comments.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment
      );
      state.comments = update;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.comments = action.payload;

      return state;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (
    payload: { postId: number; commentId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await base.delete(
        `/post/${payload.postId}/comment/${payload.commentId}`,
        authHeader()
      );
      return response.data;
    } catch (error) {
      // console.error("Error occurred during signup:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const DeleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteComment.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async (
    payload: {
      postId: number | undefined;
      content: string;
      commentId: number | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await base.put(
        `/post/${payload.postId}/comment/${payload.commentId}`,
        { content: payload.content },
        authHeader()
      );
      return response.data;
    } catch (error) {
      // console.error("Error occurred while adding comment:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const UpdateCommentSlice = createSlice({
  name: "updateComment",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateComment.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        // action.error.message
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState } = PostCommentSlice.actions;
export const {
  filterComments,
  addComment,
  updateCommentOpenState,
  updatedComment,
} = FetchCommentsSlice.actions;
export const postCommentReducer = PostCommentSlice.reducer;
export const fetchCommentsReducer = FetchCommentsSlice.reducer;
export const deleteCommentReducer = DeleteCommentSlice.reducer;
export const updateCommentReducer = UpdateCommentSlice.reducer;
