"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { nameToCamelCase } from "@/utils/reusables";
import { Users } from "@/types";
import { ProfilePic } from "@/app/components/ProfilePic";
import { getSavedPosts } from "@/redux/features/projectSlice/saveSlice";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import withAuth from "@/app/withAuth";
import SavedPost from "@/app/components/SavedPost";

const Saved = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: RootState) => state.login);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { savedPosts } = useAppSelector((state: RootState) => state.savedPosts);
  const user = users?.find((user: Users) => user?.email === email);
  const name = nameToCamelCase(user?.fullName as string);

  console.log("Saved posts", savedPosts);

  useEffect(() => {
    dispatch(getSavedPosts());
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  }
  const dateJoined = formatDate(user?.date_joined as string).split("AT")[0];

  return (
    <div>
      <div className="h-64 bg-saved-miniHero bg-no-repeat bg-cover bg-center">
        <div className=" w-full h-full backdrop-brightness-[.70]"></div>
      </div>
      <section className="md:flex md:gap-x-36 pb-20">
        <div className=" md:bg-white md:shadow-md md:rounded pt-10 md:pb-10 pb-0 px-5 md:w-80 relative -md:top-40 -top-20 md:left-24">
          <div className="flex flex-col flex-1 items-center">
            <ProfilePic
              name={name}
              classes={
                "h-24 w-24 text-4xl md:border-none border-8 border-slate-100"
              }
            />
            <h3 className="font-bold text-2xl py-3">{name}</h3>
            <p className="">{email}</p>
          </div>
          <p className="border border-sky-100 rounded md:my-5 p-4 text-left shadow-sm">
            <span className="font-bold border-b border-sky-200 pb-2 block">{`Hi ${
              name?.split(" ")[0]
            }`}</span>
            <span className="block py-4 text-sm text-gray-700">
              Hope you've been enjoying exploring the platform and sharing your
              creativity with the rest of the community! We've curated your
              saved posts and projects you've shared to make your exploration
              even easier.
            </span>
          </p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            MEMBER SINCE: {dateJoined}
          </p>
        </div>
        <div className="md:pt-10 flex-1 px-5 md:-mt-0 -mt-16">
          <h2 className="font-bold py-3">Saved Posts</h2>
          {savedPosts.length === 0 ? (
            <div className="grid justify-center justify-items-center mt-5">
              <p className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-600 text-transparent bg-clip-text text-">
                You currently don't have any post saved.
              </p>
              <GiEmptyMetalBucketHandle className="animate-bounce text-3xl text-orange-800 mt-3" />
            </div>
          ) : (
            <SavedPost posts={savedPosts} users={users} />
          )}
        </div>
      </section>
    </div>
  );
};

const AuthProtectedSavedPosts = withAuth(Saved);

export default AuthProtectedSavedPosts;
