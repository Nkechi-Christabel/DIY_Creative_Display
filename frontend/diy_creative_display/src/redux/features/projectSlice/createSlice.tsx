import axios from "axios";
import { authHeader } from "@/axiosHelper/services/auth-header";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../types";
// import { WritableDraft } from "immer";
// import type { AxiosError } from "axios";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: Status = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const createDiy = createAsyncThunk(
  "users/signup",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await base.post("/create", payload, authHeader());
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

export const CreateDiySlice = createSlice({
  name: "newDiy",
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
    builder.addCase(createDiy.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder.addCase(createDiy.rejected, (state, action) => {
      console.log("Payload", action);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        action.error.message ||
        (action.payload as { message?: string }).message ||
        "An error occurred, please try again";
    });
    builder.addCase(createDiy.pending, (state) => {
      state.isFetching = true;
    });
  },
});

export const { clearState } = CreateDiySlice.actions;
export default CreateDiySlice.reducer;
