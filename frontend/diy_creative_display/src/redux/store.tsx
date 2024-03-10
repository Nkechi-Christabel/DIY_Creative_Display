import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import loginSlice from "./features/authSlice/loginSlice";
import { signupReducer, usersReducer } from "./features/authSlice/signupSlice";
import {
  createPostReducer,
  fetchPostsReducer,
} from "./features/projectSlice/postSlice";
import { likePosts, likePostReducer } from "./features/projectSlice/postFeaturesSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducers = combineReducers({
  login: loginSlice,
  signup: signupReducer,
  createPost: createPostReducer,
  fetchPosts: fetchPostsReducer,
  users: usersReducer,
  likes: likePostReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
