import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status, PostValues } from "../../../types";

const initialState: Status & {
  posts: PostValues[];
  post: PostValues;
  searchValue: string;
  isShowSearch: boolean;
} = {
  posts: [],
  post: {
    id: 0,
    title: "",
    content: "",
    categories: { id: "", name: "" },
    photos: [],
    user_id: 0,
    date_posted: new Date(),
  },
  searchValue: "",
  isShowSearch: false,
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
      // console.error("Error occurred while creating a post:", error);
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
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.post = action.payload;

      return state;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        // action.error.message
        (action.payload as { error?: string }).error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const getAllPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (nothing, { rejectWithValue }) => {
    try {
      const response = await base.get("/posts");
      return response.data;
    } catch (error) {
      // console.error("Error occurred while getting posts:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const FetchPostsSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    filterPosts: (state, action: { payload: number }) => {
      state.posts = state.isSuccess
        ? state.posts.filter((post) => post.id !== action.payload)
        : state.posts;
    },
    getSearchValue: (state, action: { payload: string | undefined }) => {
      state.searchValue = action.payload as string;
    },
    ShowSearch: (state, action) => {
      state.isShowSearch = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = true;
      state.posts = action.payload;

      return state;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isSuccess = false;
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const getOnePost = createAsyncThunk(
  "posts/fetchPost",
  async (id: number | null, { rejectWithValue }) => {
    try {
      const response = await base.get(`/post/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error occurred while fetching a post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const FetchOnePostSlice = createSlice({
  name: "getPost",
  initialState,
  reducers: {
    fetchAPostclearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    updateEditedPost: (state, action: { payload: PostValues }) => {
      const update =
        state.post.id === action.payload.id ? action.payload : state.post;
      state.post = update;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getOnePost.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getOnePost.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      state.post = action.payload;

      return state;
    });
    builder.addCase(getOnePost.rejected, (state, action) => {
      state.isSuccess = false;
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        (action.payload as { error?: string })?.error ||
        (action.payload as { message?: string })?.message ||
        "An error occurred, please try again";
    });
  },
});

export const { clearState } = CreatePostSlice.actions;
export const { fetchAPostclearState } = FetchOnePostSlice.actions;
export const { filterPosts, getSearchValue, ShowSearch } =
  FetchPostsSlice.actions;
export const { updateEditedPost } = FetchOnePostSlice.actions;
export const createPostReducer = CreatePostSlice.reducer;
export const fetchPostsReducer = FetchPostsSlice.reducer;
export const fetchOnePostReducer = FetchOnePostSlice.reducer;
