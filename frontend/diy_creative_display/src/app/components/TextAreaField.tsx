import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import * as React from "react";
import clsx from "clsx";
import { ErrorMessage } from "./ErrorMessage";

interface TextAreaFieldProps {
  id: string;
  placeholder?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  hasError: FieldError | undefined;
  className?: string;
  label?: string;
  rows?: number;
  limit?: number | null;
  value?: string;
  errorMessage?: string;
}

export const TextAreaField: React.FunctionComponent<TextAreaFieldProps> = ({
  id,
  placeholder,
  autoFocus = false,
  registration,
  className,
  rows = 20,
  hasError,
  limit = 5000,
  value,
  errorMessage,
}) => {
  return (
    <>
      <textarea
        name={id}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={rows}
        className={clsx(
          "font-WorkSans focus-within:border-secondary w-full bg-gray-150 py-2 outline-none placeholder:text-base placeholder:text-gray-400 disabled:bg-gray-100",
          hasError && "border-red-500",
          className
        )}
        {...registration}
        maxLength={limit ? limit : undefined}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {/* {limit && (
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <p>Max. {limit} characters</p>
          <p>
            {value?.length || 0} / {limit}
          </p>
        </div>
      )} */}
    </>
  );
};
