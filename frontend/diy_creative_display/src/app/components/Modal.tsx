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
        "container mx-auto p-5 pt-6 overflow-scroll",
        !isModalImage
          ? "h-[40rem] mt-20 max-w-2xl w-[95%] bg-white shadow-lg shadow-neutral-600 backdrop-blur-2xl rounded"
          : "max-w-5xl md:h-full grid items-center mt-40 md:mt-0"
      )}
    >
      {isModalImage ? (
        <div>
          <Image
            src={post?.photos[index] as unknown as string}
            alt={post?.title}
            width={0}
            height={0}
            loader={loaderProp}
            unoptimized={true}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ) : (
        <Edit post={post} onClose={onClose} />
      )}
    </Modal>
  );
};
