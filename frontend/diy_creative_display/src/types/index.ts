export type SignupValues = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export interface signupState {
  isFetching: Boolean;
  isSuccess: Boolean;
  isError: Boolean;
  errorMessage: string;
  user: {
    name: string;
    email: string;
  };
}

export interface loginState {
  isFetching: Boolean;
  isSuccess: Boolean;
  isError: Boolean;
  errorMessage: string;
  token: string;
  email: string;
}
