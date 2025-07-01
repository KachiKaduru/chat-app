"use server";

import { getAllUserConversations } from "./chat-actions";
import { getAllUsers } from "./user-actions";

export async function getSidebarDataForPath(pathname: string) {
  switch (pathname) {
    case "/chats":
      return await getAllUserConversations();
    case "/calls":
      return [];
    case "/friends":
      return await getAllUsers();
    case "/messages":
      return await getAllUserConversations();
    case "/settings":
      return [];
    default:
      return [];
  }
}
