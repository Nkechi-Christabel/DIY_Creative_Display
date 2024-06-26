import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ImHeart } from "react-icons/im";
import {
  postLikes,
  toggleClickedLike,
} from "../../redux/features/projectSlice/postFeaturesSlice";
import { PostValues } from "@/types";

type Iprops = {
  postId: number | undefined;
  showCount: boolean;
  className?: string;
};

export const LikedIcon: React.FC<Iprops> = ({
  postId,
  showCount,
  className,
}: Iprops) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = localStorage.getItem("token");
  const { likesCount, users } = useAppSelector(
    (state: RootState) => state.likes
  );
  const { currentUser } = useAppSelector((state: RootState) => state.signup);
  const currentUserId = currentUser.id;
  const isLikedByUser =
    users && users[currentUserId]?.isLiked[postId as number]?.liked;

  const handleLikes = async (
    postId: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }
    const res = await dispatch(postLikes(postId));
    dispatch(
      toggleClickedLike({
        postId,
        user_id: res.payload?.user_id,
        currentUserId,
      })
    );
  };

  return (
    <button
      type="button"
      className={`flex items-center space-x-1 ${className}`}
      onClick={(e) => handleLikes(postId as number, e)}
    >
      <ImHeart
        className={` hover:text-pink-200 cursor-pointer transition-all active:scale-0 ease-in-out-circ duration-600
          ${token && isLikedByUser ? "text-red-500" : "text-gray-400"}  ${
          token ? "active:scale-150" : ""
        }
          
          `}
      />
      {showCount && (
        <span className="text-sm text-gray-600">
          {likesCount[postId as number] || 0}
        </span>
      )}
    </button>
  );
};
