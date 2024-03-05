import React, { useEffect } from "react";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { userName } from "../../redux/features/authSlice/signupSlice";

type Name = {
  name: string;
  userInitials?: string;
  classes?: string;
};

export const ProfilePic: React.FC<Name> = ({
  name,
  userInitials,
  classes,
}: Name) => {
  return (
    <div>
      {" "}
      <p className={`${userInitials} ${classes}`}>{name[0]?.toUpperCase()}</p>
    </div>
  );
};
