"use client";
import React, { useEffect, useState } from "react";
import {
  clearState,
  getAllPosts,
} from "@/redux/features/projectSlice/postSlice";
import { getAllUsers } from "@/redux/features/authSlice/signupSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { TbLoader3 } from "react-icons/tb";
import { Category } from "./components/Category";
import { Post } from "./components/Post";

const Home = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);
  const [selectedCategory, setSelectedCategory] = useState("DIYs");
  const { posts, isSuccess, isError, errorMessage, isFetching } =
    useAppSelector((state: RootState) => state.fetchPosts);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, []);

  return (
    <main className="container mx-auto  px-5">
      <p className="text-4xl text-center max-w-3xl mx-auto pt-10 pb-5  tracking-wide leading-normal">
        Discover, Create, and Share Your DIY Projects with the World!
        <span className="text-sm text-gray-600 block">
          Get started today and unleash your creativity with DIY Creative
          Display!
        </span>
      </p>
      <div className="">
        <div>
          {isFetching && <TbLoader3 />}
          <Category
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <Post
            selectedCategory={selectedCategory}
            posts={posts}
            users={users}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
