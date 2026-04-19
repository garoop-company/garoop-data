import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_EXACT_PATHS = new Set(["/"]);

function hasFileExtension(pathname: string) {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.includes(".");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ALLOWED_EXACT_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.endsWith(".json")) {
    return NextResponse.next();
  }

  if (hasFileExtension(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api).*)",
  ],
};
