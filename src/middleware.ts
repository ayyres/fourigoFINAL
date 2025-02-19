import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("middewe :", pathname);
  // Daftar path yang memerlukan autentikasi
  const protectedPaths = ["/Dashboard/admin", "/Dashboard/guest"];
  // Cek apakah path yang diminta termasuk dalam daftar protectedPaths
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  console.log("middewe is protected? :", isProtected);

  if (isProtected) {
    console.log("dfkgjklsdjgjkdsfg");
    const accessToken = request.cookies.get("accessToken");
    console.log("access toke: ", accessToken);
    if (!accessToken) {
      // Redirect ke halaman login jika tidak ada token
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
