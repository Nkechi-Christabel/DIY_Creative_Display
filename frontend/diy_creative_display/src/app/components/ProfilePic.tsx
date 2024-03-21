import React, { useEffect } from "react";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { handleCurrentUser } from "../../redux/features/authSlice/signupSlice";

type Name = {
  name: string;
  classes?: string;
};

export const ProfilePic: React.FC<Name> = ({ name, classes }: Name) => {
  return (
    <div>
      {" "}
      <p
        className={`flex justify-center items-center bg-amber-950 rounded-full text-gray-200 font-bold ${classes}`}
      >
        {name && name[0]?.toUpperCase()}
      </p>
    </div>
  );
};
