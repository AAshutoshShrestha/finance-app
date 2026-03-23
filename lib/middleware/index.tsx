/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "../prisma/prisma";


export async function CheckAvailableAdmin(req: any) {
  const url = req.nextUrl;

  const userCount = await prisma.user.count();

  const isSetup = url.pathname.startsWith("/setup/register");
  const isLogin = url.pathname.startsWith("/login");

  if (userCount === 0) {
    if (!isSetup) {
      return NextResponse.redirect(new URL("/setup/register", req.url));
    }
  }

  if (userCount > 0 && url.pathname === "/") {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};