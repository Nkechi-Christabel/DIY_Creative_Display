import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import { ImHeart } from "react-icons/im";
import {
  likePosts,
  // toggleLike,
} from "../../redux/features/projectSlice/postFeaturesSlice";

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
  // const { likes } = useAppSelector((state: RootState) => state.likes);
  const { isLiked, likes, post_id } = useAppSelector(
    (state: RootState) => state.likes
  );

  const handleLikes = (
    postId: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(likePosts(postId));
    // dispatch(toggleLike(postId));
  };
  // console.log("isLiked", isLiked[postId as number]);
  // localStorage.removeItem("persist:root");
  // localStorage.clear();

  // console.log("Id", postId);

  return (
    <button
      type="button"
      className={`flex items-center space-x-1 ${className}`}
      onClick={(e) => handleLikes(postId as number, e)}
    >
      <ImHeart
        className={`text-gray-400 hover:text-pink-200 cursor-pointer transition-all active:scale-0 ease-in-out-circ duration-600
          ${isLiked && postId === post_id ? "text-red-500" : ""}  ${
          token ? "active:scale-150" : ""
        }
          
          `}
      />
      {showCount && (
        <span className="text-sm text-gray-600">
          {(likes && likes[postId as number]) || 0}
        </span>
      )}
    </button>
  );
};
