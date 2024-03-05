export interface Option {
  name: string;
  id: string;
}

export type SignupValues = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type Status = {
  isFetching: Boolean;
  isSuccess: Boolean;
  isError: Boolean;
  errorMessage: string;
};

export interface SignupState extends Status {
  confirmedName: string;
  user: {
    name: string;
    email: string;
  };
}

export interface LoginState extends Status {
  token: string;
  email: string;
}

export interface PictureValues {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

// export interface FileList {
//   File: PictureValues;
//   length: number;
// }

// interface AnyPresentValue extends Option {}
export interface createDiyValues {
  title: string;
  content: string;
  categories: Option;
  picture: PictureValues | Blob;
}

