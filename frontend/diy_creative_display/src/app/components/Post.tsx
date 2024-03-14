import { CreatePostValues, Users } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
// import { getAllUsers } from "@/redux/features/authSlice/signupSlice";

import Default from "../../../public/assets/default.jpg";
import { ProfilePic } from "./ProfilePic";
import { LiaSave } from "react-icons/lia";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useAppSelector, RootState } from "@/redux/store";
import { LikedIcon } from "./LikedIcon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deletePost } from "@/redux/features/projectSlice/postFeaturesSlice";
import { filterPosts } from "@/redux/features/projectSlice/postSlice";

type Iprops = {
  posts: CreatePostValues[];
  selectedCategory: string;
  users: Users[];
};

export const Post: React.FC<Iprops> = ({
  posts,
  selectedCategory,
  users,
}: Iprops) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const { currentUser } = useAppSelector((state: RootState) => state.signup);
  const { searchValue } = useAppSelector(
    (state: RootState) => state.fetchPosts
  );

  let filteredPosts;

  if (searchValue) {
    if (selectedCategory === "DIYs") {
      filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue?.toLowerCase())
      );
    } else {
      filteredPosts = posts
        .filter(
          (post) => (post.categories as unknown as string) === selectedCategory
        )
        .filter((post) =>
          post.title.toLowerCase().includes(searchValue?.toLowerCase())
        );
    }
  }

  if (!searchValue) {
    if (selectedCategory === "DIYs") filteredPosts = posts;
    else {
      filteredPosts = posts.filter(
        (post) => (post.categories as unknown as string) === selectedCategory
      );
    }
  }

  const handleDelete = (postId: number) => {
    if (!token) {
      redirect("/login");
    }
    dispatch(deletePost(postId));
    dispatch(filterPosts(postId));
  };

  console.log("user", currentUser);

  return (
    <div className="posts">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7 mt-4">
        {filteredPosts?.map((post) => (
          <div key={post.id} className="post ">
            <div className="relative group">
              <Link href={token ? `/post/${post.id}` : "/login"}>
                <img
                  src={(post.photos[0] as unknown as string) ?? Default}
                  alt=""
                  className="w-full h-72 xm:h-auto rounded-xl object-cover"
                />
                {/* <Image
                  src={(post.photos[0] as unknown as string) ?? Default}
                  //   src={Default}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="rounded h-56"
                /> */}
                <div className="flex justify-around items-end  content-center absolute bottom-full top-0 p-4 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-xl w-full group-hover:bottom-0 transition-all duration-500 ease-in-out">
                  <p className="hidden group-hover:block text-white text-ellipsis text-lg font-bold">
                    {post.title}
                  </p>
                  <button
                    type="button"
                    className=" hidden group-hover:flex items-center text-white bg-black bg-opacity-45 rounded-full py-1 px-3 mt-18"
                  >
                    <LiaSave className="mr-2" />
                    <span className="text-sm">Save</span>
                  </button>
                </div>
              </Link>
            </div>
            <div className="posts_user flex items-center justify-between">
              <h2 className="flex space-x-2 py-2">
                <ProfilePic
                  classes="text-base w-6 h-6"
                  name={
                    users.find((user) => user.id === post.user_id)
                      ?.fullName as string
                  }
                />
                <span className="text-base">
                  {users.find((user) => user.id === post.user_id)?.fullName ??
                    "Unknown User"}
                </span>
              </h2>
              <div className="flex items-center space-x-2">
                <Link href={token ? `/post/${post.id}` : "/login"}>
                  <LikedIcon postId={post.id} showCount={true} />
                </Link>
                <MdOutlineDeleteOutline
                  className={`text-xl text-red-600 hover:text-red-400 active:scale-150 cursor-pointer${
                    token && currentUser.id === post.user_id
                      ? "pointer-events-auto active:scale-150"
                      : "pointer-events-none active:scale-0"
                  }`}
                  onClick={() => handleDelete(post.id as number)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
