"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { disableNavFooter, nameToCamelCase } from "../../utils/reusables";
import { logout } from "../../redux/features/authSlice/loginSlice";
import { BiSearch } from "react-icons/bi";
import { Logo } from "./Logo";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ProfilePic } from "./ProfilePic";
import {
  clearState,
  handleCurrentUser,
} from "../../redux/features/authSlice/signupSlice";
import { Transition } from "@headlessui/react";
import { Users } from "@/types";
import {
  ShowSearch,
  getSearchValue,
} from "@/redux/features/projectSlice/postSlice";

export const Header = React.memo(() => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const genericHamburgerLine = `bg-black transition ease transform duration-300`;
  const userInitials =
    "flex justify-center items-center bg-amber-950 w-10 h-10 rounded-full text-gray-200";
  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "DIY New Post", href: "/post/create" },
    { name: "For You", href: "/post/saved" },
  ];
  const { email, token } = useAppSelector((state: RootState) => state.login);
  const { users } = useAppSelector((state: RootState) => state.users);
  const user = users?.find((user: Users) => user?.email === email);
  const name = nameToCamelCase(user?.fullName as string);
  const disableSearch = ["/post/saved", "/"];

  useEffect(() => {
    dispatch(handleCurrentUser({ name: name, id: user?.id }));
  }, [dispatch, name, user]);

  useEffect(() => {
    dispatch(getSearchValue(searchValue));
  }, []);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(clearState());
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleProfileHover = () => {
    setHover(true);
    setIsOpen(false);
    setShowSearch(false);
  };

  const handleShowSearch = () => {
    if (!disableSearch.includes(pathname)) {
      router.push("/");
    }
    setHover(false);
    setIsOpen(false);
    setShowSearch(!showSearch);
    dispatch(ShowSearch(!showSearch));
  };

  return (
    <>
      {!disableNavFooter.includes(pathname) && (
        <header className="pt-3 h-16">
          <nav
            className={`${
              isOpen
                ? "fixed left-0 right-0 top-3 z-50 w-full h-screen bg-black bg-opacity-40 transition-all ease-in-circ delay-[200ms]"
                : ""
            }`}
          >
            <div className="flex justify-between items-center big_screen md:pl-0 px-5 lg:pr-7 pb-3 bg-white">
              <div className="flex items-center space-x-5">
                <button
                  className="group flex flex-col items-center justify-center md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div
                    className={`my-[.14rem] h-[.14rem] ${genericHamburgerLine} ${
                      isOpen
                        ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100 my-1 w-5"
                        : "opacity-50 group-hover:opacity-100 w-6"
                    }`}
                  />
                  <div
                    className={`${genericHamburgerLine} ${
                      isOpen
                        ? "opacity-0 my-1 w-5 h-[.53rem]"
                        : "opacity-50 group-hover:opacity-100 w-6 h-[.14rem] my-[.14rem]"
                    }`}
                  />
                  <div
                    className={`my-[.14rem] h-[.14rem] ${genericHamburgerLine} ${
                      isOpen
                        ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100 my-1 w-5"
                        : "opacity-50 group-hover:opacity-100 w-3"
                    }`}
                  />
                </button>
                <Logo classes="block lg:hidden" />
                <ul className="menu md:flex items-center space-x-4 hidden">
                  {navItems.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                      <li key={item.name}>
                        <Link
                          className={clsx(
                            "hover:text-gray-600",
                            isActive && "text-yellow-700"
                          )}
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Logo classes="hidden lg:block" />
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <BiSearch
                    className="inline-block lg:absolute top-[.8rem] lg:pointer-events-none left-9 lg:text-gray-400 lg:text-base text-2xl lg:mr-0 mr-3 lg:cursor-none cursor-pointer"
                    onClick={handleShowSearch}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="hidden lg:block bg-gray-50 rounded-2xl pl-10 pr-7 py-[.6rem] ml-5 outline-none text-sm"
                    onChange={(e) => handleSearchValue(e)}
                  />
                </div>
                {token ? (
                  <div>
                    <div
                      className="cursor-pointer"
                      onMouseEnter={handleProfileHover}
                    >
                      <ProfilePic name={name} classes="text-xl w-10 h-10 " />
                    </div>
                    <div
                      className={`dropdown-profile w-72 p-7 absolute top-20 right-6 z-10 bg-white border border-gray-300 rounded-md shadow-md ${
                        hover && !isOpen ? "block" : "hidden"
                      }`}
                      onMouseLeave={() => setHover(false)}
                    >
                      <ul className="flex flex-col items-center pb-2">
                        <li className="py-2">
                          <ProfilePic
                            name={name}
                            classes="w-16 h-16 text-4xl"
                          />
                        </li>
                        <li className="pt-2">{name}</li>
                        <li className="pb-2 text-base text-gray-400">
                          {email}
                        </li>
                      </ul>
                      <ul>
                        <li className="hover:text-gray-600 py-2">
                          <Link href="/post/create">Upload a new DIY</Link>
                        </li>
                        <li className="hover:text-gray-600 pt-2 pb-4">
                          <Link href="/post/saved">Your saved posts</Link>
                        </li>
                        <li className="hover:text-gray-600 pt-4 pb-2 border-t border-gray-200">
                          <Link href="" onClick={() => handleSignout()}>
                            Sign out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="md:block hidden hover:text-gray-60">
                      <Link href="/login">Log in</Link>
                    </div>
                    <div className="text-white bg-black rounded-3xl py-2 px-4 hover:bg-gray-700">
                      <Link href="signup">Sign Up</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Transition
              className="relative bg-white border-t border-gray-200 z-50"
              show={isOpen}
              enter="transition-all ease-in-out-circ duration-500 delay-[200ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="small_screen_dopdown_menu px-1">
                <ul className="px-5">
                  {navItems.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                      <li key={item.name} className="py-3 ease-in-out-circ">
                        <Link
                          className={clsx(
                            "hover:text-slate-600",
                            isActive && ""
                          )}
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}

                  <div className="border-t border-gray-200 py-4 mt-3 hover:text-gray-600">
                    {token ? (
                      <Link href="/" onClick={() => handleSignout()}>
                        Sign out
                      </Link>
                    ) : (
                      <Link href="/login">Sign in</Link>
                    )}
                  </div>
                </ul>
              </div>
            </Transition>
          </nav>
          <div
            className={clsx(
              "relative top-5 z-40 mx-auto max-w-2xl px-6",
              showSearch && disableSearch.includes(pathname)
                ? "block"
                : "hidden"
            )}
          >
            <input
              type="text"
              placeholder="Search"
              className=" bg-white rounded-lg shadow-md border border-gray-200 py-3 px-5 outline-none text-sm w-full"
              onChange={(e) => handleSearchValue(e)}
            />
          </div>
        </header>
      )}
    </>
  );
});
