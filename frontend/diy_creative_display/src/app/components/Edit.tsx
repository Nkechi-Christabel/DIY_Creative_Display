"use client";
import React, { useEffect, useState } from "react";
import {
  CreatePostValues,
  EditPostValues,
  Option,
  PictureValues,
  PostValues,
} from "../../types";
import { clearState } from "../../redux/features/projectSlice/postFeaturesSlice";
import Image from "next/image";
import { InputField } from "@/app/components/InputField";
import { IoCamera } from "react-icons/io5";
import { ProfilePic } from "@/app/components/ProfilePic";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdOutlineCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextAreaField } from "@/app/components/TextAreaField";
import { SelectField } from "@/app/components/SelectField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImSpinner2 } from "react-icons/im";
import { categories, ErrorPhotos } from "@/app/post/create/page";
import { updatePost } from "@/redux/features/projectSlice/postFeaturesSlice";
import { updateEditedPost } from "@/redux/features/projectSlice/postSlice";

interface IProps {
  post: PostValues;
  onClose: () => void;
}

export const Edit: React.FC<IProps> = ({ post, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [index, sedtIndex] = useState<number>();
  const [picturePreview, setPicturePreview] = useState<
    File[] | PictureValues[]
  >([]);
  const { isSuccess, isError, errorMessage, isFetching } = useAppSelector(
    (state: RootState) => state.updatePost
  );

  const { currentUser } = useAppSelector((state: RootState) => state.signup);

  const FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const schema = yup.object({
    title: yup
      .string()
      .required("A title is required")
      .min(3, "Should contain minimum of 8 characters")
      .max(100, "Should contain maximum of 100 characters"),
    content: yup.string().required("Content can't be blank"),
    categories: yup.mixed<Option>().required("Please select a category"),
    photos: yup.array().of(
      yup
        .mixed<PictureValues>()
        .required("This field is required")
        .test(
          "fileSize",
          "File too large",
          (value) => (value as File).size <= FILE_SIZE
        )
        .test("fileFormat", "Unsupported File Format", (value) =>
          SUPPORTED_FORMATS.includes((value as File).type)
        )
    ),
  });

  const {
    watch,
    control,
    setValue,
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditPostValues>({
    resolver: yupResolver<EditPostValues>(schema),
    mode: "onBlur",
  });
  const { onChange, ...params } = register("photos");

  //Checks for errors on photo, loops through if there is and remove the error
  //that matches he picture that was removed by the user
  const photosError =
    (errors?.photos?.length &&
      (errors?.photos as ErrorPhotos[])
        ?.filter((_, i) => i !== index)
        ?.map(
          (error, idx, arr) =>
            `${arr.length > 1 ? idx + 1 + ") " : ""} ${error?.message}`
        )
        ?.join("\n")) ||
    "";

  useEffect(() => {
    const fields: string[] = ["title", "content", "categories"];
    fields.forEach((field: string) => {
      setValue(
        field as keyof EditPostValues,
        post[field as keyof EditPostValues]
      ); // Use keyof for safe access

      setValue("photos", [] as File[]);
    });
  }, []);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setPicturePreview((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const removeImage = (name: string, idx: number) => {
    setPicturePreview(
      picturePreview &&
        picturePreview?.filter((picture) => picture?.name !== name)
    );

    setValue(
      "photos",
      getValues("photos")?.filter((file) => file?.name !== name)
    );
    onChange({
      target: {
        name: "photo",
        value: getValues("photos")?.filter((file) => file?.name !== name),
      },
    });
    sedtIndex(idx);
  };

  const content = watch("content");

  const onSubmit: SubmitHandler<EditPostValues> = async (
    data: EditPostValues,
    e
  ) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categories", (data.categories as Option).name);

    // Iterate over 'photos' array and append each picture as a file to 'FormData'
    data?.photos?.forEach((picture: PictureValues) => {
      formData.append("photos", picture as File);
    });

    const response = await dispatch(updatePost({ formData, postId: post.id }));
    dispatch(updateEditedPost(response.payload.updatedPost));

    reset();
    setPicturePreview([]);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post created successfully.");
      dispatch(clearState());
      reset();
      setTimeout(() => onClose(), 2000);
    } else if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, errorMessage, isError, isSuccess, reset]);

  return (
    <>
      <div>
        <ToastContainer position="bottom-left" />
        <div>
          <div className="flex items-center space-x-3 mb-9">
            <ProfilePic name={currentUser.name} classes="text-xl w-10 h-10 " />
            <p>{currentUser.name}</p>
          </div>
          <div className="pt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                type="text"
                control={control}
                registration={{ ...register("title") }}
                hasError={errors.title}
                errorMessage={errors.title?.message}
                placeholder="What's your title?"
                isRequired
                className="bg-transparent border-0 border-b rounded-none"
              />
              <TextAreaField
                id="message"
                placeholder="Share your DIY"
                value={content}
                registration={{ ...register("content") }}
                errorMessage={errors.content?.message}
                hasError={errors.content}
                isRequired
                className="mb-1 mt-2 border-gray-150 text-gray-950 placeholder-gray-150"
              />
              <SelectField
                name="categories"
                placeholder="Select a category"
                control={control as unknown as Control}
                arr={categories}
                errorMessage={errors.categories?.message}
                hasError={errors.categories}
                className="my-3 max-w-4xl"
              />
              <div className="flex justify-between flex-wrap">
                {picturePreview &&
                  picturePreview.map((file, idx) => (
                    <div
                      className="relative border-8 border-gray-50 shadow-xl backdrop-blur-2xl"
                      key={idx}
                    >
                      <MdOutlineCancel
                        className="absolute -right-3 -top-3 text-xl text-red-700 cursor-pointer"
                        onClick={() => removeImage(file.name, idx)}
                      />
                      <Image
                        src={URL.createObjectURL(file as File)}
                        alt="Image upload"
                        width={250}
                        height={250}
                        unoptimized={true}
                        className="w-60 h-56 object-cover"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-end items-center space-x-3 pt-3">
                <InputField
                  label={
                    <span className="flex items-center space-x-2 bg-gray-200 rounded p-2 cursor-pointer">
                      <IoCamera className="inline-block text-lg" />
                      <span>Add an image</span>
                    </span>
                  }
                  type="file"
                  control={control}
                  registration={{ ...register("photos") }}
                  hasError={errors.photos}
                  errorMessage={photosError}
                  handleImagePreview={handleImagePreview}
                  getValues={getValues}
                  accept={"image/*"}
                  hide="hidden"
                />
                <button
                  type="submit"
                  className="flex justify-center items-center space-x-3 bg-gradient-to-br from-rose-500 to-amber-700 hover:bg-gradient-to-br hover:from-amber-600 hover:to-rose-600 py-2 px-6 rounded text-white"
                >
                  {isFetching && (
                    <ImSpinner2 className="animate-spin text-xl" />
                  )}
                  <span>Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
