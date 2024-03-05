"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { disableNav } from "../../utils/disableNav";
import { logout } from "../../redux/features/authSlice/loginSlice";
import { BiSearch } from "react-icons/bi";
import { Logo } from "./Logo";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ProfilePic } from "./ProfilePic";
import { userName } from "../../redux/features/authSlice/signupSlice";
import { Transition } from "@headlessui/react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const genericHamburgerLine = `bg-black transition ease transform duration-300`;
  const userInitials =
    "flex justify-center items-center bg-amber-950 w-10 h-10 rounded-full text-gray-200 text-xl";
  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "DIY Post", href: "/create" },
    { name: "Contact Us", href: "/contact" },
  ];
  const { email, token } = useAppSelector((state: RootState) => state.login);
  const { user } = useAppSelector((state: RootState) => state.signup);
  const getName = user?.email === email ? user?.name.split(" ") : "";
  const name: string =
    getName &&
    getName[1] &&
    `${getName[0][0]?.toUpperCase() + getName[0]?.slice(1)} ${
      getName[1][0]?.toUpperCase() + getName[1]?.slice(1)
    }`;

  useEffect(() => {
    dispatch(userName(name));
  }, [dispatch, name]);

  return (
    <>
      {!disableNav.includes(pathname) && (
        <header className="py-3">
          <nav
            className={`${
              isOpen
                ? "relative w-full h-screen bg-black bg-opacity-40 transition-all ease-in-circ delay-[200ms]"
                : ""
            }`}
          >
            <div className="flex justify-between items-center big_screen md:pl-0 px-5 pb-3 bg-white">
              <div className="left flex space-x-5">
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
                <Logo />
                <ul className="menu md:flex space-x-4 hidden">
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
              <div className="right flex items-center space-x-5">
                <div className="relative">
                  <BiSearch className="inline-block lg:absolute top-[.7rem] left-9 lg:text-gray-400 lg:text-base text-2xl lg:mr-0 mr-3 lg:cursor-none cursor-pointer" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="hidden lg:block bg-slate-50 rounded-2xl pl-10 pr-7 py-2 ml-5 outline-none text-sm"
                  />
                </div>
                {token ? (
                  <div>
                    <div
                      className="cursor-pointer"
                      onMouseEnter={() => {
                        setHover(true);
                        setIsOpen(false);
                      }}
                    >
                      <ProfilePic name={name} userInitials={userInitials} />
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
                            userInitials={userInitials}
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
                          <Link href="">Upload a new DIY</Link>
                        </li>
                        <li className="hover:text-gray-600 pt-2 pb-4">
                          <Link href="">DIY profile</Link>
                        </li>
                        <li className="hover:text-gray-600 pt-4 pb-2 border-t border-gray-200">
                          <Link href="" onClick={() => dispatch(logout())}>
                            Sign out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="md:block hidden hover:text-gray-600">
                      <Link href="/login">Log in</Link>
                    </div>
                    <div className="text-white bg-black rounded-3xl py-2 px-4 hover:bg-gray-600">
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
              <div className="small_screen_dopdown_menu px-5">
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
                      <Link href="/" onClick={() => dispatch(logout())}>
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
        </header>
      )}
    </>
  );
};
