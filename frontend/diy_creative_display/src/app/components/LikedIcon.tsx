import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ImHeart } from "react-icons/im";
import { likePosts } from "../../redux/features/projectSlice/postFeaturesSlice";

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
  };

  return (
    <button
      type="button"
      className={`flex items-center space-x-1 ${className}`}
      onClick={(e) => handleLikes(postId as number, e)}
    >
      <ImHeart
        className={`text-gray-400 hover:text-pink-200 cursor-pointer transition-all active:scale-0 ease-in-out-circ duration-600
          ${token && isLiked && postId === post_id ? "text-red-500" : ""}  ${
          token ? "active:scale-150" : ""
        }
          
          `}
      />
      {showCount && (
        <span className="text-sm text-gray-600">
          {likes[postId as number] || 0}
        </span>
      )}
    </button>
  );
};
