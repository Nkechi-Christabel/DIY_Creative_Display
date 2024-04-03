import React, { useEffect } from "react";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { handleCurrentUser } from "../../redux/features/authSlice/signupSlice";

type Name = {
  name: string;
  classes?: string;
};

export const ProfilePic: React.FC<Name> = ({ name, classes }: Name) => {
  return (
    <div
      className={`flex justify-center items-center  bg-amber-950 rounded-full ${classes}`}
    >
      {" "}
      <p className={` text-gray-200 font-bold `}>
        {name && name[0]?.toUpperCase()}
      </p>
    </div>
  );
};
