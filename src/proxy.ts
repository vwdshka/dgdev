import { NextResponse, type NextRequest } from "next/server";

// "/" has no page of its own: send Greek browsers to /el and everyone else to /en.
export function proxy(request: NextRequest) {
  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const url = request.nextUrl.clone();
  url.pathname = first.startsWith("el") ? "/el" : "/en";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
