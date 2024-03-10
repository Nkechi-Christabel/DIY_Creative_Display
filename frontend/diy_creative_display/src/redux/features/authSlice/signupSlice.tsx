import axios from "axios";
import { Status } from "../../../types";
import { SignupValues, Users } from "../../../types";
import { baseUrlApi } from "../../../axiosHelper/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const base = axios.create({
  baseURL: baseUrlApi,
});

const initialState: Status & {
  confirmedName: string;
  users: Users[];
} = {
  confirmedName: "",
  users: [],
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
      const userData = {
        fullName: response.data.fullName,
        email: response.data.email,
        id: response.data.id,
      };
      localStorage.setItem(userData.email, JSON.stringify(userData));

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
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    });
    builder
      .addCase(signupUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          (action.payload as { message?: string })?.message ||
          (action.payload as { message?: string })?.message ||
          "An error occured, please try again";
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const getAllUsers = createAsyncThunk("users/users", async () => {
  const response = await base.get("/users");
  return response.data;
});

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const user = action.payload;
      return {
        ...state, // Spread the existing state
        users: user, // Create a new array with the new user added
        isFetching: false,
        isSuccess: true,
      };
    });
    builder
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          (action.payload as { message?: string })?.message ||
          (action.payload as { message?: string })?.message ||
          "An error occured, please try again";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState, userName } = SignupSlice.actions;
export const signupReducer = SignupSlice.reducer;
export const usersReducer = UsersSlice.reducer;
