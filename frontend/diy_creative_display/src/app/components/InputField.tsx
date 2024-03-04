import React from "react";
import clsx from "clsx";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";
import { Controller, FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type?: "text" | "number" | "email" | "password";
  label?: string;
  className?: string;
  placeholder?: string;
  iconPosition?: "start" | "end";
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  isDisabled?: boolean;
  hasError: FieldError | undefined;
  withIcon?: boolean;
  canPressSpace?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  min?: string;
  max?: string;
  value?: string | number;
  isRequired?: boolean;
  errorMessage?: string | undefined;
  control: any;
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
  min,
  max,
  value,
  withIcon,
  handleTogglePassword,
  isDisabled = false,
}: InputFieldProps) => {
  const { name } = registration;

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
              className
            )}
            type={type}
            disabled={isDisabled}
            name={name}
            value={value}
            id={name}
            // onKeyDown={canPressSpace ? undefined : handleKeyDown}
            min={min}
            max={max}
            {...registration}
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
      {errorMessage && label && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
