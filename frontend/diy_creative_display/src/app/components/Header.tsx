"use client";
import { useState } from "react";
import clsx from "clsx";
import { disableNav } from "../../utils/disableNav";
import { logout } from "../../redux/features/loginSlice";
import { BiSearch } from "react-icons/bi";
import { Logo } from "./Logo";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    { name: "DIY Post", href: "/newpost" },
    { name: "Contact Us", href: "/contact" },
  ];
  const { email, token } = useAppSelector((state: RootState) => state.login);
  const { user } = useAppSelector((state: RootState) => state.signup);
  let getName = user?.email === email ? user?.name.split(" ") : "";
  getName = `${getName[0][0].toUpperCase() + getName[0].slice(1)} ${
    getName[1][0].toUpperCase() + getName[1].slice(1)
  }`;

  return (
    <>
      {!disableNav.includes(pathname) && (
        <header className="py-3">
          <nav
            className={`${
              isOpen ? "relative w-full h-screen bg-black bg-opacity-40" : ""
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
                          className={clsx("", isActive && "text-amber-100")}
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="right flex items-center space-x-3">
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
                      <p className={`${userInitials}`}>
                        {getName[0]?.toUpperCase()}
                      </p>
                    </div>
                    <div
                      className={`dropdown-profile w-72 p-7 absolute top-20 right-6 bg-white border border-gray-300 rounded-md shadow-md ${
                        hover && !isOpen ? "block" : "hidden"
                      }`}
                      onMouseLeave={() => setHover(false)}
                    >
                      <ul className="flex flex-col items-center pb-2">
                        <li
                          className={`py-2 w-16 h-16 text-4xl ${userInitials}`}
                        >
                          {getName[0]?.toUpperCase()}
                        </li>
                        <li className="pt-2">{getName}</li>
                        <li className="pb-2 text-base text-gray-400">
                          {email}
                        </li>
                      </ul>
                      <ul>
                        <li className="py-2">
                          <Link href="">Upload a new DIY</Link>
                        </li>
                        <li className="pt-2 pb-4">
                          <Link href="">DIY profile</Link>
                        </li>
                        <li className="pt-4 pb-2 border-t border-gray-200">
                          <Link href="" onClick={() => dispatch(logout())}>
                            Sign out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="md:block hidden">
                      <Link href="/login">Log in</Link>
                    </div>
                    <div className="text-white bg-black rounded-3xl py-2 px-4">
                      <Link href="signup">Sign Up</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className={`small_screen_dopdown_menupx-5 relative
              `}
            >
              <ul
                className={`px-5 absolute top-full left-0 w-full bg-white border-t border-gray-200 overflow-hidden transition duration-600 ease-in-out-circ z-50 ${
                  isOpen ? "-translate-x-0" : "-translate-x-full"
                }`}
              >
                {navItems.map((item) => {
                  const isActive = item.href === pathname;
                  return (
                    <li key={item.name} className="py-3">
                      <Link
                        className={clsx("", isActive && "text-amber-100")}
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}

                <div className="border-t border-gray-200 py-4 mt-3">
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
          </nav>
        </header>
      )}
    </>
  );
};
