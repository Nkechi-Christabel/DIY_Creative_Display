import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  // const { pathname } = request.nextUrl;
  // const protectedRoutes = ["/create"];
  // if (protectedRoutes && protectedRoutes.includes(pathname)) {
  //   // Handle protected routes
  //   const token = localStorage.getItem("token");
  //   const isAuthorized = token ? token : {};
  //   console.log("Token", token);
  //   console.log("Authorized", isAuthorized);
  //   if (!isAuthorized) {
  //     // Redirect unauthorized users to a login or error page
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }
  // // Allow access for non-protected routes or authorized users for protected routes
  // return NextResponse.next();
};

export default middleware;
