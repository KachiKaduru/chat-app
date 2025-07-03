import { auth } from "./app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/chats", "/calls", "/friends", "/settings", "/messages"],
};
