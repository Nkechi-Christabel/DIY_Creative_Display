<<<<<<< HEAD
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { LoginState } from "../../../types";
import { LoginValues } from "../../../types";
import { baseUrlApi } from "../../../axiosHelper/index";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: LoginState = {
  token: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const loginUser = createAsyncThunk(
  "users/login",

  async (payload: LoginValues, { rejectWithValue }) => {
    try {
      const response = await base.post("/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    } catch (error) {
      console.error("Error occurred during login:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<LoginState>) => {
        state.token = payload.token;
        state.email = payload.email;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      }
    );
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          (action.payload as { error?: string })?.error ||
          (action.payload as { message?: string })?.message ||
          "An error occured, please try again";
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
=======
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { LoginState } from "../../../types";
import { LoginValues } from "../../../types";
import { baseUrlApi } from "../../../axiosHelper/index";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: LoginState = {
  token: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const loginUser = createAsyncThunk(
  "users/login",

  async (payload: LoginValues, { rejectWithValue }) => {
    try {
      const response = await base.post("/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    } catch (error) {
      // console.error("Error occurred during login:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<LoginState>) => {
        state.token = payload.token;
        state.email = payload.email;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      }
    );
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          (action.payload as { error?: string })?.error ||
          (action.payload as { message?: string })?.message ||
          "An error occured, please try again";
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
>>>>>>> 464ca9d6eaea0eb7482d025aa36d93c692e314e8
