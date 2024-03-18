import { PostValues, SavePostValues, Users } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import clsx from "clsx";
import Default from "../../../public/assets/default.jpg";
import { ProfilePic } from "./ProfilePic";
import { LiaSave } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { useAppSelector, RootState } from "@/redux/store";
import {
  clearState,
  filterSavedPosts,
  savePosts,
} from "@/redux/features/projectSlice/saveSlice";
import { GiCheckMark } from "react-icons/gi";

type Iprops = {
  posts: SavePostValues[];
  users: Users[];
};

const SavedPost: React.FC<Iprops> = ({ posts, users }: Iprops) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(
    (state: RootState) => state.fetchPosts
  );

  const { isFetching, isSaved } = useAppSelector(
    (state: RootState) => state.savePost
  );

  const filteredPosts = searchValue
    ? posts.filter((post) => post.post_details.title.includes(searchValue))
    : posts;

  useEffect(() => {
    dispatch(clearState());
  }, []);

  console.log("Posts", posts);
  console.log("Success fetching", isSaved);

  const handleSavePost = (
    postId: number,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(savePosts(postId));
    dispatch(filterSavedPosts(postId));
  };

  const handleDetailsPageRedirection = (post: SavePostValues) => {
    router.push(`/post/${post.post_id}`);
  };

  return (
    <div className="posts">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7 mt-4 pb-32">
        {filteredPosts?.map((post) => (
          <div key={post.id} className="post ">
            <div
              className="relative group cursor-pointer"
              onClick={() => handleDetailsPageRedirection(post)}
            >
              <img
                src={
                  (post?.post_details.photos[0] as unknown as string) ?? Default
                }
                alt=""
                className="w-full h-72 xm:h-auto rounded-xl object-cover"
              />
              {/* <Image
                  src={(post?.photos[0] as unknown as string) ?? Default}
                  //   src={Default}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-72 xm:h-auto rounded-xl object-cover"
                /> */}

              <div className="flex justify-around items-end  content-center absolute bottom-full top-0 p-4 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-xl w-full group-hover:bottom-0 transition-all duration-500 ease-in-out">
                <p className="hidden group-hover:block text-white text-ellipsis text-lg font-bold">
                  {post.post_details.title}
                </p>
                <button
                  type="button"
                  className={clsx(
                    "hidden group-hover:flex items-center text-white bg-black bg-opacity-45 rounded-full py-1 px-3 mt-18",
                    isFetching ? "bg-gray-400" : ""
                  )}
                >
                  {isSaved ? (
                    <GiCheckMark className="text-green-400 mr-2 00 transition-all duration-700 ease-in-out" />
                  ) : (
                    <LiaSave className="mr-2" />
                  )}

                  <span
                    className="text-sm hover:text-slate-300"
                    onClick={(e) => handleSavePost(post.post_id as number, e)}
                  >
                    {`${isSaved ? "Saved" : "Save"}`}
                  </span>
                </button>
              </div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPost;
