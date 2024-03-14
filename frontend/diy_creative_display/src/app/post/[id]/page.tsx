"use client";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { getOnePost } from "@/redux/features/projectSlice/postSlice";
import { useParams } from "next/navigation";
import { LikedIcon } from "@/app/components/LikedIcon";
import { IoSaveOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import { ProfilePic } from "@/app/components/ProfilePic";
import { nameToCamelCase } from "@/utils/reusables";
import { CiEdit } from "react-icons/ci";
import { TfiControlForward } from "react-icons/tfi";
import {
  addComment,
  deleteComment,
  getComments,
  postComment,
  filterComments,
  updateCommentOpenState,
} from "@/redux/features/projectSlice/commentSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CommentValues } from "@/types";

const PostDetails = React.memo(() => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [comment_id, setComment_id] = useState<number>();
  const [commentValue, setCommentValue] = useState("");
  const [commentIsOpen, setCommentIsOpen] = useState<CommentValues[]>();
  const id = params?.id ? parseInt(params.id.toString()) : null;
  const { post } = useAppSelector((state: RootState) => state.fetchPost);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { currentUser } = useAppSelector((state: RootState) => state.signup);
  const { comments } = useAppSelector(
    (state: RootState) => state.fetchComments
  );
  const [updatedCommentValue, setUpdatedCommentValue] = useState("");
  const title = nameToCamelCase(post.title);
  const postUserName = nameToCamelCase(
    users.find((user) => user.id === post.user_id)?.fullName as string
  );

  useEffect(() => {
    dispatch(getOnePost(id));
  }, [id]);

  useEffect(() => {
    dispatch(getComments(post.id));
  }, [post.id]);

  function timeAgo(dateString: string): string {
    const now = new Date();
    const commentDate = new Date(dateString);

    // Calculate the difference in milliseconds
    const differenceMs = now.getTime() - commentDate.getTime();

    // Convert milliseconds to seconds, minutes, hours, and days
    const secondsAgo = Math.floor(differenceMs / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else {
      return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
    }
  }

  const handleCommentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handlePostCommentDispatch = async () => {
    const response = await dispatch(
      postComment({ content: commentValue, postId: post.id })
    );
    setCommentValue("");
    dispatch(addComment(response.payload.new_comment));
    console.log(response.payload.new_comment);
  };

  const handleDelete = (postId: number, commentId: number) => {
    dispatch(deleteComment({ postId, commentId }));
    dispatch(filterComments(commentId));
  };

  const handleEditIcon = (postId: number, commentId: number) => {
    setComment_id(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    commentToEdit && setUpdatedCommentValue(commentToEdit.content);

    dispatch(updateCommentOpenState(commentId));
  };
  const handleEditOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedCommentValue(e.target.value);
  };

  return (
    <div
      className="container mx-auto max-w-5xl p-5 mb-16 scroll-smooth"
      id="top"
    >
      <section className="pt-5">
        <div className="">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl">{title}</h3>
            <div className="flex items-center space-x-5">
              <LikedIcon
                postId={post.id}
                showCount={false}
                className="border border-gray-200 rounded-full p-3 bg-red-50"
              />

              <span className="border border-gray-200 bg-slate-50 p-3 rounded-full group">
                <AiOutlineSave className="text-lg cursor-pointer" />
                <span className="absolute right-24 top-20 text-rose-700 bg-white py-2 px-3 shadow-lg shadow-slate-300 border border-gray-200 rounded transition-all ease-out-quart duration-500 hidden group-hover:block">
                  Save for later?
                </span>
              </span>
            </div>
          </div>
          <div className="md:flex md:flex-row flex-col space-y-5 md:space-x-5 md:space-y-0 pt-4">
            <div className="flex-[4] max-h">
              <img
                src={post.photos[index] as unknown as string}
                alt={post.title}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex md:flex-col space-x-4 md:space-x-0 flex-1 cursor-pointer md:h-90 overflow-scroll">
              {post.photos.map((url, idx) => (
                <img
                  key={idx}
                  src={url as unknown as string}
                  alt={post.title}
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
              <h3 className="font-bold text-lg pt-7 pb-2">Poster</h3>
              <div className="flex space-x-2">
                <ProfilePic name={postUserName} classes="text-sm w-8 h-8" />
                <span>{postUserName}</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Category:</h3>
              <p className="text-sm">{post.categories as unknown as string}</p>
              <CiEdit className="m-10 text-xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="comments bg-zinc-100 rounded h-96 overflow-scroll mb-3 mt-10 p-5">
        <div className="container mx-auto max-w-4xl h-full pt-7">
          <div className="">
            {comments?.map((comment, idx) => (
              <div
                key={comment?.id}
                className={`relative group ${idx !== 0 && "mt-6"}`}
              >
                <div className="flex space-x-3">
                  <ProfilePic name={comment?.user.fullName} classes="h-9 w-9" />
                  <div className="">
                    <p className="font-semibold text-slate-500">
                      {nameToCamelCase(comment?.user.fullName)}
                      <span className="ml-2">
                        {timeAgo(comment?.date_posted)}
                      </span>
                    </p>
                    {comment?.isOpen && comment?.id === comment_id ? (
                      <textarea
                        name="updateComment"
                        id="updateComment"
                        cols={100}
                        rows={2}
                        value={updatedCommentValue}
                        className="outline-none py-2 px-4 mt-1"
                        onChange={(e) => handleEditOnchange(e)}
                      ></textarea>
                    ) : (
                      <p>{comment?.content}</p>
                    )}
                  </div>
                </div>
                <div className="editDelete hidden group-hover:flex items-center space-x-3 absolute -top-1 right-10 bg-slate-200 rounded py-1 px-3 transition-all">
                  <CiEdit
                    className={`text-[1.4rem] hover:text-gray-700 ${
                      currentUser.id === comment?.user.id
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => handleEditIcon(comment.post_id, comment.id)}
                  />
                  <MdOutlineDeleteOutline
                    className="text-[1.4rem] text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(comment.post_id, comment.id)}
                  />
                </div>
              </div>
            ))}
          </div>
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

export default PostDetails;
