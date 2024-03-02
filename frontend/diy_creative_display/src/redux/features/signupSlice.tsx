import axios from "axios";
// import { WritableDraft } from "immer";

import { signupState } from "../../types";
import { SignupValues } from "../../types";
import { baseUrlApi } from "../../axiosHelper/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: signupState = {
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
        // If it's an AxiosError, handle it accordingly
        return rejectWithValue(error.response?.data);
      } else {
        // If it's another type of error, handle it as appropriate
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
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      console.log("Payload", state);
      state.user = {
        name: payload.fullName,
        email: payload.email,
      };
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder
      .addCase(signupUser.rejected, (state, action: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          action?.payload?.error || "An error occured, please try again";
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = SignupSlice.actions;
export default SignupSlice.reducer;
