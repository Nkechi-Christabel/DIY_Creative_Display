"use client";
import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Logo } from "../../components/Logo";
import { SignupValues } from "../../../types";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

import {
  signupUser,
  clearState,
} from "../../../redux/features/authSlice/signupSlice";
import { InputField } from "../../components/InputField";

const Playfair = Playfair_Display({ weight: "400", subsets: ["latin"] });
const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Should contain 3 numbers")
      .max(100, "Should contain maximum of 100 characters"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .max(100, "Should contain maximum of 100 characters"),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password is too short."),
  })
  .required();

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { isSuccess, isError, errorMessage } = useAppSelector(
    (state: RootState) => state.signup
  );

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User created successfully.");
      reset();
      dispatch(clearState());
      router.push("/login");
    } else if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, errorMessage, isError, isSuccess, reset, router]);

  const onSubmit: SubmitHandler<SignupValues> = (data: SignupValues, e) => {
    e?.preventDefault();
    dispatch(signupUser(data));
    reset();
  };

  return (
    <div
      className={`bg-gradient-to-r from-auth-100 via-auth-50 to-auth-200 h-screen ${Playfair.className}`}
    >
      <ToastContainer position="top-right" />
      <div className="sm:container sm:mx-auto h-screen flex justify-center items-center sm:py-16">
        {" "}
        <div className="bg-auth-bg bg-cover bg-no-repeat w-full h-full shadow-lg shadow-slate-800">
          <Logo classes="text-white px-4 py-3" />
        </div>
        <div className="flex flex-col items-center text-white bg-auth-200 bg-opacity-70 sm:pt-44 p-6 sml:w-[400px] sm:h-screen absolute z-10">
          <h1 className="text-3xl">SIGN UP</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 w-full sm:px-8"
          >
            <InputField
              label="FULL NAME"
              type={"text"}
              control={control}
              registration={{ ...register("fullName") }}
              hasError={errors.fullName}
              errorMessage={errors.fullName?.message}
              isRequired
              className="bg-transparent border-0 border-b rounded-none"
            />
            <InputField
              label="EMAIL"
              type={"text"}
              control={control}
              registration={{ ...register("email") }}
              hasError={errors.email}
              errorMessage={errors.email?.message}
              isRequired
              className="bg-transparent border-0 border-b rounded-none"
            />
            <InputField
              label="PASSWORD"
              type={showPassword ? "text" : "password"}
              control={control}
              registration={{ ...register("password") }}
              hasError={errors.password}
              errorMessage={errors.password?.message}
              withIcon={true}
              iconEnd={showPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
              handleTogglePassword={handleTogglePassword}
              isRequired
              className="bg-transparent border-0 border-b rounded-none"
            />
            <div className="flex justify-center pt-7 pb-8">
              <button
                type="submit"
                className="py-3 bg-slate-300 bg-opacity-40 w-full border rounded-3xl"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <p>
            <Link
              href="/login"
              className="font-semibold text-amber-200  hover:text-amber-400"
            >
              Log in
            </Link>{" "}
            if you already have an account
          </p>
          <p className="text-xs font-light font-mono pt-2">Creativity is you</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
