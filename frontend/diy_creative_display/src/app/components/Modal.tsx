import React from "react";
import Modal from "react-modal";
import clsx from "clsx";
import { Edit } from "./Edit";
import { PostValues } from "@/types";

interface IProps {
  //   children?: React.ReactNode;
  isOpen?: boolean;
  post: PostValues;
  isModalImage: boolean;
  index: number;
  onClose?: () => void;
}

export const MyModal: React.FC<IProps> = ({
  //   children,
  isOpen,
  post,
  isModalImage,
  index,
  onClose,
}: IProps) => {
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
        "container mx-auto   bg-white shadow-lg shadow-neutral-600 backdrop-blur-2xl rounded p-5 pt-6  max-h-full overflow-scroll",
        !isModalImage ? "h-[35rem] mt-32 max-w-2xl" : "h-full mb-5 max-w-3xl"
      )}
    >
      {isModalImage ? (
        <div>
          <img
            src={post?.photos[index] as unknown as string}
            alt={post?.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ) : (
        <Edit post={post} />
      )}
    </Modal>
  );
};

// export default MyModal;

// export const Modal = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="w-full h-lvh fixed top-0 left-0 bottom-0 bg-black bg-opacity-50 z-50">
//       {children}
//     </div>
//   );
// };
