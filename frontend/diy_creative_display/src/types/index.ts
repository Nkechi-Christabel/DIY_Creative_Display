export interface Option {
  name: string;
  id: string;
}

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface Status {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface LoginState extends Status {
  token: string;
  email: string;
}

export type Users = {
  id: number;
  fullName: string;
  email: string;
};

export interface PictureValues {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface CreatePostValues {
  id?: number;
  title: string;
  content: string;
  categories: Option;
  photos: PictureValues[];
  user_id?: number;
}

export interface CommentReducerValues {
  content: string;
  postId: number | undefined;
}

export interface CommentValues {
  content: string;
  post_id: number;
  id: number;
  date_posted: string;
  user: {
    date_joined: string;
    email: string;
    fullName: string;
    id: number;
  };
  isOpen: boolean;
}
