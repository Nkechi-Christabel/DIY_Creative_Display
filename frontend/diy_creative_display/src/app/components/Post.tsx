import { CreatePostValues, PostValues, Users } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import Default from "../../../public/assets/default.jpg";
import { ProfilePic } from "./ProfilePic";
import { LiaSave } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { useAppSelector, RootState } from "@/redux/store";
import { LikedIcon } from "./LikedIcon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deletePost } from "@/redux/features/projectSlice/postFeaturesSlice";
import { filterPosts } from "@/redux/features/projectSlice/postSlice";
import { clearState, savePosts } from "@/redux/features/projectSlice/saveSlice";
import { GiCheckMark } from "react-icons/gi";
import { nameToCamelCase } from "@/utils/reusables";

type Iprops = {
  posts: PostValues[];
  selectedCategory?: string;
  users: Users[];
};

export const Post: React.FC<Iprops> = ({
  posts,
  selectedCategory,
  users,
}: Iprops) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const { currentUser } = useAppSelector((state: RootState) => state.signup);
  const { searchValue } = useAppSelector(
    (state: RootState) => state.fetchPosts
  );

  const { isFetching, isSaved, post_id } = useAppSelector(
    (state: RootState) => state.savePost
  );

  const sortedPosts = posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime()
    );

  let filteredSortedPosts;

  useEffect(() => {
    dispatch(clearState());
  });

  if (searchValue) {
    if (selectedCategory === "DIYs") {
      filteredSortedPosts = sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue?.toLowerCase())
      );
    } else {
      filteredSortedPosts = sortedPosts
        .filter(
          (post) => (post.categories as unknown as string) === selectedCategory
        )
        .filter((post) =>
          post.title.toLowerCase().includes(searchValue?.toLowerCase())
        );
    }
  }

  if (!searchValue) {
    if (selectedCategory === "DIYs") filteredSortedPosts = sortedPosts;
    else {
      filteredSortedPosts = posts.filter(
        (post) => (post.categories as unknown as string) === selectedCategory
      );
    }
  }

  const handleDelete = (postId: number) => {
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(deletePost(postId));
    dispatch(filterPosts(postId));
  };

  const handleSavePost = (
    postId: number | undefined,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!token) {
      router.push("/login");
    }

    dispatch(savePosts(postId));
  };

  const handleDetailsPageRedirection = (post: PostValues) => {
    router.push(`/post/${post.id}`);
  };

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="posts">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7 mt-4 pb-32">
        {filteredSortedPosts?.map((post) => (
          <div key={post.id} className="post ">
            <div
              className="relative group cursor-pointer"
              onClick={() => handleDetailsPageRedirection(post)}
            >
              <Image
                src={
                  (post?.photos && (post?.photos[0] as unknown as string)) ??
                  Default
                }
                alt={post.title}
                width={300}
                height={200}
                loader={loaderProp}
                unoptimized={true}
                priority={true}
                className="w-full h-64 xm:h-auto rounded-md object-cover"
              />

              <div className="absolute bottom-full top-0 p-4 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-md w-full group-hover:bottom-0 transition-all duration-500 ease-in-out">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className=" hidden group-hover:flex items-center text-white bg-black bg-opacity-45  hover:bg-gray-700 hover:bg-opacity-60  rounded-full py-1 px-3 mt-18"
                    onClick={(e) => handleSavePost(post.id as number, e)}
                  >
                    {isSaved && post.id === post_id ? (
                      <GiCheckMark className="text-green-400 mr-2 00 transition-all duration-700 ease-in-out" />
                    ) : (
                      <LiaSave className="mr-2" />
                    )}

                    <span className="text-sm">
                      {`${isSaved && post.id === post_id ? "Saved" : "Save"}`}
                    </span>
                  </button>
                </div>
                <p className="items-end hidden group-hover:flex h-5/6 text-white text-ellipsis text-md font-bold">
                  {post.title}
                </p>
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
                  {nameToCamelCase(
                    users.find((user) => user.id === post.user_id)
                      ?.fullName as string
                  ) ?? "Unknown User"}
                </span>
              </h2>
              <div className="flex items-center space-x-2">
                <LikedIcon postId={post.id as number} showCount={true} />
                <MdOutlineDeleteOutline
                  className={`text-xl text-red-600 hover:text-red-400 active:scale-150 ${
                    token && currentUser.id === post.user_id
                      ? "pointer-events-auto active:scale-150 cursor-pointer"
                      : "pointer-events-none active:scale-0  cursor-pointer"
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
