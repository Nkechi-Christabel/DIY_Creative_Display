import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import clsx from "clsx";
import { Option } from "../../types";
import { ErrorMessage } from "./ErrorMessage";

type HasErrorType = Merge<
  FieldError,
  (
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          name: string;
          id: string;
        }>
      >
    | undefined
  )[]
>;

type SelectFieldProps = {
  className?: string;
  arr: Option[];
  isDisabled?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  isOptionClass?: string;
  errorMessage?: string;
  hasError: HasErrorType | undefined;
  hasBorder?: boolean;
  openModal?: () => void;
} & UseControllerProps;

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const {
    field: { value, onChange, ref },
  } = useController(props);
  const {
    arr,
    className,
    hasBorder = true,
    hasError = false,
    placeholder = "Select option",
    isMultiple = false,
    isDisabled = false,
    isOptionClass = "pl-10 pr-4",
    errorMessage,
  } = props;

  const hasMultipleOption = isMultiple && value && value.length > 0;

  return (
    <div className="w-full">
      <Listbox
        value={value?.id || ""}
        onChange={onChange}
        multiple={isMultiple}
      >
        <div className="relative ">
          <Listbox.Button
            className={clsx(
              "block h-11 w-full rounded-xl border border-gray-250 px-4 text-left text-sm text-gray-950 ",
              hasError && "border-red-500",
              !hasBorder && "border-transparent px-0",
              isDisabled
                ? "pointer-events-none cursor-not-allowed bg-gray-100"
                : " bg-gray-150",
              className
            )}
          >
            {!isMultiple && (
              <span className="block truncate">
                {value?.id ? (
                  (value as Option).name
                ) : (
                  <span className="text-gray-0 text-sm font-light">
                    {placeholder}
                  </span>
                )}
              </span>
            )}

            {isMultiple && (
              <span className="text-sm font-light text-gray-950">
                {placeholder}
              </span>
            )}

            <span
              className={clsx(
                "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",
                hasError ? "text-red-500" : "text-gray-250",
                isMultiple && "top-4"
              )}
            >
              <svg
                className="stroke-current"
                width="14"
                height="15"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.25 5.34766L7 11.7643L1.75 5.34766"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>

          {hasMultipleOption && (
            <div className="mt-2 flex flex-wrap gap-2">
              {value
                .filter((option: Option) => option.id !== "all")
                .map((option: Option) => {
                  const handleRemove = (id: string) => {
                    const newValue = value.filter((o: Option) => o.id !== id);
                    onChange(newValue);
                  };
                  return (
                    <div
                      className="bg-secondary/20  flex items-center space-x-1 pl-2 text-sm"
                      key={option.id}
                    >
                      <p className="py-1">{option.name}</p>
                      <button
                        type="button"
                        className="p-2 hover:bg-red-400 hover:text-white"
                        onClick={() => handleRemove(option.id)}
                      >
                        <span className="font-medium">x</span>
                      </button>
                    </div>
                  );
                })}
            </div>
          )}

          <Transition
            as={React.Fragment}
            enter="transition-opacity transition-transform duration-200 origin-center"
            enterFrom="scale-0 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <Listbox.Options
              className="absolute z-20 mt-1  max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm"
              ref={ref}
            >
              {arr &&
                arr.map((obj: { id: string; name: string }, index: Number) => (
                  <Listbox.Option
                    key={obj.id}
                    className={({ active }) =>
                      clsx(
                        "group relative cursor-pointer py-2",
                        isOptionClass,
                        active
                          ? "bg-gray-400 bg-opacity-80 text-white"
                          : "text-gray-900",
                        !(arr.length - 1 === index) && "border-b"
                      )
                    }
                    value={obj}
                  >
                    {({ selected }) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {obj.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900 group-hover:text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                ))}
              {arr.length === 0 && (
                <p className="w-full px-5 py-1 text-sm text-gray-600">
                  No options
                </p>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};
