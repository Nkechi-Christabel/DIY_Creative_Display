"use client";
import React, { useEffect } from "react";
import Modal from "react-modal";
import clsx from "clsx";
import { Edit } from "./Edit";
import { PostValues } from "@/types";
import Image from "next/image";

interface IProps {
  isOpen?: boolean;
  post: PostValues;
  isModalImage: boolean;
  index: number;
  onClose: () => void;
}

export const MyModal: React.FC<IProps> = ({
  isOpen,
  post,
  isModalImage,
  index,
  onClose,
}: IProps) => {
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={isOpen as boolean}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          border: "none",
          outline: "none",
        },
      }}
      className={clsx(
        "container mx-auto rounded p-5 pt-6  max-h-full overflow-scroll",
        !isModalImage
          ? "h-[35rem] mt-32 max-w-2xl bg-white shadow-lg shadow-neutral-600 backdrop-blur-2xl"
          : "h-full max-w-3xl grid items-center"
      )}
    >
      {isModalImage ? (
        <div>
          <Image
            src={post?.photos[index] as unknown as string}
            alt={post?.title}
            width={300}
            height={200}
            loader={loaderProp}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ) : (
        <Edit post={post} onClose={onClose} />
      )}
    </Modal>
  );
};
