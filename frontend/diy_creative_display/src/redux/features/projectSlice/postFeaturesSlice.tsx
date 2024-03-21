<<<<<<< HEAD
import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & {
  likes: Record<number, number>;
  // isLiked: Record<number, boolean | {}>;
  isLiked: boolean;
  post_id: number | null;
} = {
  likes: {},
  isLiked: false,
  post_id: null,
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
      console.error("Error occurred while liking a post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const LikePostSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    // toggleLike(state, action: { payload: number }) {
    //   // Action to toggle like status
    //   const postId = action.payload;
    //   state.isLiked[postId] = !state.isLiked[postId] || false; // Toggle or set to false if not existing
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(likePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(likePosts.fulfilled, (state, action) => {
      const { post_id, likes_count, isLiked } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.post_id = post_id;
      state.isLiked = isLiked;
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
      console.error("Error occurred while deleting a post:", error);
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
      console.error("Error occurred while updating a post:", error);
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
export const likePostReducer = LikePostSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
export const updatePostReducer = UpdatePostSlice.reducer;
=======
import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostValues, Status } from "../../../types";

const initialState: Status & {
  likes: Record<number, number>;
  // isLiked: Record<number, boolean | {}>;
  isLiked: boolean;
  post_id: number;
} = {
  likes: {},
  isLiked: false,
  post_id: 0,
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
      // console.error("Error occurred while liking a post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const LikePostSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    // toggleLike(state, action: { payload: number }) {
    //   // Action to toggle like status
    //   const postId = action.payload;
    //   state.isLiked[postId] = !state.isLiked[postId] || false; // Toggle or set to false if not existing
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(likePosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(likePosts.fulfilled, (state, action) => {
      const { post_id, likes_count, isLiked } = action.payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.post_id = post_id;
      state.isLiked = isLiked;
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
export const likePostReducer = LikePostSlice.reducer;
export const deletePostReducer = DeletePostSlice.reducer;
export const updatePostReducer = UpdatePostSlice.reducer;
>>>>>>> 464ca9d6eaea0eb7482d025aa36d93c692e314e8
