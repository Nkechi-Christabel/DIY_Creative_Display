// "use client";
import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Lato } from "next/font/google";
import { Header } from "./components/Header";

import "./globals.css";

const ReduxProvider = dynamic(() => import("../redux/Provider"), {
  ssr: false,
});

const inter = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
