"use client";
import React from "react";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import { disableNavFooter } from "@/utils/reusables";
import Link from "next/link";
import { FaAngleDoubleUp } from "react-icons/fa";

export const Footer = () => {
  const pathname = usePathname();
  const menuList = [
    { name: "New DIY", href: "/post/create" },
    { name: "About Us", href: "/about" },
    { name: "For You", href: "/post/saved" },
    { name: "Terms", href: "/terms" },
  ];
  return (
    <>
      {!disableNavFooter.includes(pathname) && (
        <footer className="py-2 border-t bg-white shadow-2xl shadow-gray-700 fixed bottom-0 left-0 right-0">
          <div className="container mx-auto max-w-7xl px-5 xl:px-0">
            <div className="flex items-center flex-wrap gap-x-28 gap-y-3">
              <Logo />
              <ul className="flex flex-wrap gap-x-14 gap-y-2">
                {menuList.map((menu, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    <Link href={menu.href}>{menu.name}</Link>
                  </li>
                ))}
                <li className="text-sm text-gray-600">
                  © 2024 DIY creative Display
                </li>
              </ul>
            </div>
          </div>

          <Link href="#top">
            <FaAngleDoubleUp className="fixed bottom-3 right-8 text-lg hover:scale-125" />
          </Link>
        </footer>
      )}
    </>
  );
};
