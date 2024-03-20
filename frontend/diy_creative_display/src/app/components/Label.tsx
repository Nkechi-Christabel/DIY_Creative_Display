import React from "react";
import clsx from "clsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
  isRequired?: boolean;
};

export const Label = ({ className, isRequired, ...props }: LabelProps) => {
  return (
    <label
      className={clsx(
        "pb-1 pt-5 flex space-x-1 text-sm font-semibold",
        className
      )}
      {...props}
    >
      <span>{props.children}</span>
      {isRequired && <span className="text-red-600 font-bold pl-1">*</span>}
    </label>
  );
};

// Label.displayName = "Label";
