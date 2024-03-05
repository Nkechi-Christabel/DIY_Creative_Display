import axios from "axios";
import { SignupState } from "../../../types";
import { SignupValues } from "../../../types";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: SignupState = {
  confirmedName: "",
  user: {
    name: "",
    email: "",
  },
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signupUser = createAsyncThunk(
  "users/signup",
  async (payload: SignupValues, { rejectWithValue }) => {
    try {
      const response = await base.post("/auth/signup", payload, {
        headers: { "Content-Type": "application/json" },
      });
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

export const SignupSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    userName: (state, { payload }: { payload: string }) => {
      const name = payload;
      state.confirmedName = name;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.user = {
        name: payload.fullName,
        email: payload.email,
      };
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder
      .addCase(signupUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          (action.payload as { message?: string }).message ||
          (action.payload as { message?: string }).message ||
          "An error occured, please try again";
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, userName } = SignupSlice.actions;
export default SignupSlice.reducer;
