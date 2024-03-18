import React from "react";
import clsx from "clsx";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";
import {
  Controller,
  FieldError,
  UseFormRegisterReturn,
  FieldErrorsImpl,
  Merge,
  UseFormGetValues,
} from "react-hook-form";
import { CreatePostValues } from "@/types";

interface InputFieldProps {
  type?: "text" | "number" | "email" | "password" | "file";
  label?: string | JSX.Element | undefined;
  className?: string;
  placeholder?: string;
  iconPosition?: "start" | "end";
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  isDisabled?: boolean;
  hasError: Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
  withIcon?: boolean;
  canPressSpace?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  min?: string;
  max?: string;
  value?: string | number;
  isRequired?: boolean;
  errorMessage?: string | undefined;
  control: any;
  hide?: string;
  accept?: string;
  getValues?: UseFormGetValues<CreatePostValues>;
  handleImagePreview?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePassword?: () => void;
}

export const InputField = ({
  type,
  iconStart,
  iconEnd,
  label,
  hasError,
  className,
  isRequired,
  errorMessage,
  control,
  registration,
  placeholder,
  min,
  max,
  value,
  withIcon,
  hide,
  accept,
  getValues,
  handleImagePreview,
  handleTogglePassword,
  isDisabled = false,
}: InputFieldProps) => {
  const { name, onChange } = registration;

  return (
    <>
      <div className={clsx("mb-4")}>
        <div className="">
          {!!label && (
            <Label htmlFor={name} isRequired={isRequired}>
              {label}
            </Label>
          )}
        </div>
        <div className="relative flex-1 ">
          <input
            className={clsx(
              "font-WorkSans focus-within:border-secondary pb-3 w-full rounded-lg border border-gray-200 outline-none  disabled:bg-gray-100",
              hasError && "border-red-500 border-b-2",
              className,
              hide
            )}
            type={type}
            disabled={isDisabled}
            name={name}
            value={value}
            id={name}
            placeholder={placeholder}
            accept={accept}
            // onKeyDown={canPressSpace ? undefined : handleKeyDown}
            min={min}
            max={max}
            multiple
            {...registration}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleImagePreview && handleImagePreview(e);
              onChange &&
                onChange({
                  target: {
                    name: "photos",
                    value: getValues &&
                      e.target.files && [
                        ...((getValues("photos") as File[]) || []),
                        ...Array.from(e.target.files),
                      ],
                  },
                });
            }}
          />
          {/* )}
          /> */}

          {withIcon && (
            <span
              onClick={() => handleTogglePassword && handleTogglePassword()}
              className="cursor-pointer"
            >
              <span className="p-1 absolute inset-y-4 left-3">{iconStart}</span>
              <span className="p-1 absolute inset-y-4 right-3">{iconEnd}</span>
            </span>
          )}
        </div>
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
