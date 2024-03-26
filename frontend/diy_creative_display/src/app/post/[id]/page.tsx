"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { getOnePost } from "@/redux/features/projectSlice/postSlice";
import { useParams } from "next/navigation";
import { LikedIcon } from "@/app/components/LikedIcon";
import { IoSaveOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import { ProfilePic } from "@/app/components/ProfilePic";
import { nameToCamelCase } from "@/utils/reusables";
import { CiEdit } from "react-icons/ci";
import { timeAgo } from "@/utils/reusables";
import { TfiControlForward } from "react-icons/tfi";
import {
  addComment,
  deleteComment,
  getComments,
  postComment,
  filterComments,
  updateCommentOpenState,
  updateComment,
  updatedComment,
} from "@/redux/features/projectSlice/commentSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import withAuth from "@/app/withAuth";
import { MyModal } from "@/app/components/Modal";
import { useRouter } from "next/navigation";
import { savePosts } from "@/redux/features/projectSlice/saveSlice";
import Image from "next/image";
import { TbLoaderQuarter } from "react-icons/tb";
import { SkeletonLoader } from "@/app/components/SkeletonLoader";

const PostDetails = React.memo(() => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [comment_id, setComment_id] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalImage, setIsModalImage] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const id = params?.id ? parseInt(params.id.toString()) : null;
  const { post, isFetching } = useAppSelector(
    (state: RootState) => state.fetchPost
  );
  const { users } = useAppSelector((state: RootState) => state.users);
  const { currentUser } = useAppSelector((state: RootState) => state.signup);
  const { comments, isFetching: fetching } = useAppSelector(
    (state: RootState) => state.fetchComments
  );
  const [commentToBeUpdated, setCommentTobeUpdated] = useState("");
  const title = nameToCamelCase(post.title);
  const user = users.find((user) => user.id === post.user_id);
  const postUserName = nameToCamelCase(user?.fullName as string);
  const { isSaved, post_id } = useAppSelector(
    (state: RootState) => state.savePost
  );

  useEffect(() => {
    dispatch(getOnePost(id));
    dispatch(getComments(id as number));
  }, [id]);

  const handleCommentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handlePostCommentDispatch = async () => {
    const response = await dispatch(
      postComment({ content: commentValue, postId: post.id as number })
    );
    setCommentValue("");
    dispatch(addComment(response.payload.new_comment));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePostCommentDispatch();
    }
  };

  const handleDelete = (postId: number, commentId: number) => {
    dispatch(deleteComment({ postId, commentId }));
    dispatch(filterComments(commentId));
  };

  const handleEditIcon = (commentId: number) => {
    setComment_id(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    commentToEdit && setCommentTobeUpdated(commentToEdit.content);

    dispatch(updateCommentOpenState(commentId));
  };
  const handleEditOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentTobeUpdated(e.target.value);
  };

  const handleEditCancel = (commentId: number) => {
    dispatch(updateCommentOpenState(commentId));
  };

  const handleEditSave = async (commentId: number) => {
    const response = await dispatch(
      updateComment({
        postId: post.id as number,
        content: commentToBeUpdated,
        commentId: commentId,
      })
    );
    dispatch(updatedComment(response.payload.updatedComment));
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsModalImage(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSavePost = (postId: number) => {
    dispatch(savePosts(postId));
  };

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="container mx-auto max-w-5xl p-5 scroll-smooth" id="top">
      <MyModal
        isOpen={isOpen}
        post={post}
        isModalImage={isModalImage}
        index={index}
        onClose={handleCloseModal}
      />

      <section className="pt-5">
        {isFetching ? (
          <div className="flex justify-center">
            <TbLoaderQuarter className="text-5xl text-amber-700 animate-spin" />
          </div>
        ) : (
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl">{title}</h3>
              <div className="flex items-center space-x-5">
                <LikedIcon
                  postId={post.id as number}
                  showCount={false}
                  className="border border-gray-200 rounded-full p-3 bg-red-50"
                />

                <span className="border border-gray-200 bg-slate-50 p-3 rounded-full group cursor-pointer">
                  <AiOutlineSave
                    className="text-lg "
                    onClick={() => handleSavePost(post.id as number)}
                  />
                  <span className="absolute right-24 top-20 text-yellow-700 bg-white py-2 px-3 shadow-lg shadow-slate-300 border border-gray-200 rounded transition-all ease-out-quart duration-500 hidden group-hover:block">
                    {`${
                      isSaved && post.id === post_id
                        ? "Post saved"
                        : "Save for later?"
                    }`}
                  </span>
                </span>
              </div>
            </div>

            <div className="md:flex md:flex-row flex-col space-y-5 md:space-x-5 md:space-y-0 pt-4">
              <div
                className="flex-[4] cursor-pointer"
                onClick={() => {
                  handleOpenModal();
                  setIsModalImage(true);
                }}
              >
                <Image
                  src={
                    post?.photos && (post?.photos[index] as unknown as string)
                  }
                  alt={post?.title}
                  width={300}
                  height={200}
                  loader={loaderProp}
                  unoptimized={true}
                  priority={true}
                  className="w-full h-[38rem] rounded-lg object-cover"
                />
              </div>
              <div className="flex md:flex-col space-x-4 md:space-x-0 flex-1 cursor-pointer md:h-90 overflow-scroll">
                {post?.photos?.map((url, idx) => (
                  <Image
                    key={idx}
                    src={url as unknown as string}
                    alt={post.title}
                    width={300}
                    height={200}
                    loader={loaderProp}
                    unoptimized={true}
                    priority={true}
                    className={`md:w-full w-3/12 h-auto rounded-lg mb-4 ${
                      idx === index && "border-2 border-pink-400"
                    }`}
                    onClick={() => setIndex(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="details sm:flex space-x-10 my-5">
              <div className="flex-[3]">
                <h3 className="text-xl font-bold">Description</h3>
                <p className="">{post.content}</p>
                <h3 className="font-bold text-lg pt-7 pb-2">Author</h3>
                <div className="flex  space-x-2">
                  <ProfilePic name={postUserName} classes="text-sm w-8 h-8" />
                  <div className="">
                    <p className="">{postUserName}</p>
                    <p className="text-gray-600 font-light text-sm">
                      {timeAgo(user?.date_joined as string, "Hosting")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold pt-2 sm:pt-0">Category:</h3>
                <p className="text-sm">
                  {typeof post.categories !== "object" &&
                    (post.categories as unknown as string)}
                </p>
                <button type="button" onClick={handleOpenModal}>
                  <CiEdit
                    className={clsx(
                      "m-10 text-xl cursor-pointer",
                      currentUser.id !== post.user_id
                        ? "pointer-events-none"
                        : "pointer-events-auto"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="comments bg-zinc-100 rounded h-96 overflow-scroll mb-3 mt-10 p-5 relative">
        <div className="container mx-auto max-w-4xl h-full pt-7">
          {fetching ? (
            <SkeletonLoader />
          ) : (
            <div>
              {comments?.map((comment, idx) => (
                <div
                  key={comment?.id}
                  className={`relative group ${idx !== 0 && "mt-6"}`}
                >
                  <div className="flex space-x-3">
                    <ProfilePic
                      name={comment?.user.fullName}
                      classes="h-9 w-9"
                    />
                    <div>
                      <p className="font-semibold text-slate-500">
                        {nameToCamelCase(comment?.user.fullName)}
                        <span className="ml-2">
                          {timeAgo(comment?.date_posted, "ago")}
                        </span>
                      </p>
                      {comment?.id === comment_id && comment?.isOpen ? (
                        <div className="">
                          <textarea
                            name="updateComment"
                            id="updateComment"
                            cols={100}
                            rows={2}
                            value={commentToBeUpdated}
                            className="outline-none py-2 px-4 mt-1"
                            onChange={(e) => handleEditOnchange(e)}
                          ></textarea>
                          <p className="text-sm text-amber-700  font-semibold space-x-3">
                            <span
                              className="cursor-pointer"
                              onClick={() => handleEditCancel(comment.id)}
                            >
                              Cancel
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => handleEditSave(comment.id)}
                            >
                              Save
                            </span>
                          </p>
                        </div>
                      ) : (
                        <pre>{comment?.content}</pre>
                      )}
                    </div>
                  </div>
                  <div className="editDelete hidden group-hover:flex items-center space-x-3 absolute -top-1 right-10 bg-slate-200 rounded py-1 px-3 transition-all">
                    <CiEdit
                      className={`text-[1.4rem] hover:text-gray-700 ${
                        currentUser.id === comment?.user.id
                          ? "pointer-events-auto cursor-pointer"
                          : "pointer-events-none"
                      }`}
                      onClick={() => handleEditIcon(comment.id)}
                    />
                    <MdOutlineDeleteOutline
                      className="text-[1.4rem] text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(comment.post_id, comment.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="relative flex items-end h-full">
            <ProfilePic
              name={currentUser?.name}
              classes="h-7 w-7 text-lg absolute bottom-14 left-5"
            />
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
              value={commentValue}
              className="bg-white border border-gray-50 rounded-full shadow-lg px-14 py-4 w-full outline-none mb-10"
              onChange={(e) => handleCommentValue(e)}
              onKeyDown={(e) => handlePressEnter(e)}
            />
            <TfiControlForward
              className="text-2xl text-gray-600 hover:text-gray-800 absolute bottom-14 right-5 cursor-pointer"
              onClick={() => handlePostCommentDispatch()}
            />
          </div>
        </div>
      </section>
    </div>
  );
});

// export default PostDetails;

const AuthProtectedPostDetails = withAuth(PostDetails);

export default AuthProtectedPostDetails;
