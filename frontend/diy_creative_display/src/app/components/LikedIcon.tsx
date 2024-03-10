import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImHeart } from "react-icons/im";
import { likePosts } from "../../redux/features/projectSlice/postFeaturesSlice";

type Iprops = {
  post_id: number | undefined;
  likeCounts: number;
  isSuccess: boolean;
};

export const LikedIcon: React.FC<Iprops> = ({
  post_id,
  likeCounts,
  isSuccess,
}: Iprops) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const token = localStorage.getItem("user");

  const handleLikes = async (post_id: number) => {
    console.log("Post id", post_id);
    if (!token) {
      router.push("/login");
    }
    try {
      setIsLiked(!isLiked); // Optimistic update (optional)
      await dispatch(likePosts(post_id)); // Dispatch like action
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  console.log("Likes", isLiked);

  return (
    <button type="button" className="flex items-center space-x-1">
      <ImHeart
        className={` hover:text-pink-300 cursor-pointer ${
          isSuccess && isLiked
            ? "text-red-700 transition-all ease-in-quart duration-300"
            : "text-gray-400"
        }`}
        onClick={() => handleLikes(post_id as number)}
      />
      <span className="text-sm text-gray-600">{likeCounts}</span>
    </button>
  );
};
