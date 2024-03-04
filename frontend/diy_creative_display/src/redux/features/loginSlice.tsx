import axios from "axios";
import { loginState } from "../../types";
import { LoginValues } from "../../types";
import { baseUrlApi } from "../../axiosHelper/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: loginState = {
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
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    } catch (error) {
      console.error("Error occurred during login:", error);
      if (axios.isAxiosError(error)) {
        // If it's an AxiosError, handle it accordingly
        return rejectWithValue(error.response?.data);
      } else {
        // If it's another type of error, handle it as appropriate
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
      localStorage.removeItem("user");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      //   console.log("Response data", payload);
      state.token = payload.token;
      state.email = payload.email;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder
      .addCase(loginUser.rejected, (state, action: any) => {
        console.log(action);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          action.payload.message || "An error occured, please try again";
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
