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
  fetchOnePostReducer,
} from "./features/projectSlice/postSlice";
import {
  deletePostReducer,
  postLikesReducer,
  // updatePost,
  updatePostReducer,
} from "./features/projectSlice/postFeaturesSlice";

import {
  deleteCommentReducer,
  fetchCommentsReducer,
  postCommentReducer,
  updateCommentReducer,
} from "./features/projectSlice/commentSlice";
import {
  fetchSavedPostsReducer,
  savePostReducer,
} from "./features/projectSlice/saveSlice";

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

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducers = combineReducers({
  login: loginSlice,
  signup: signupReducer,
  createPost: createPostReducer,
  fetchPosts: fetchPostsReducer,
  users: usersReducer,
  likes: postLikesReducer,
  fetchPost: fetchOnePostReducer,
  deletePost: deletePostReducer,
  updatePost: updatePostReducer,
  comment: postCommentReducer,
  fetchComments: fetchCommentsReducer,
  deleteComment: deleteCommentReducer,
  updateComment: updateCommentReducer,
  savePost: savePostReducer,
  savedPosts: fetchSavedPostsReducer,
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
      immutableCheck: false,
    }),
});
// storage.removeItem("persist:root");

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
