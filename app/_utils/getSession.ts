"use server";

import { Session } from "next-auth";
import { auth } from "../_lib/auth";

export async function getSession(): Promise<Session> {
  const session = await auth();

  return session as Session;
}
