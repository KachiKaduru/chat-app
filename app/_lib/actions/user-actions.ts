"use server";

import { signIn, signOut } from "../auth";
import { supabase } from "../supabase";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/chats" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function getSingleUser(id: string) {
  const { data } = await supabase.from("users").select("*").eq("id", id);

  return data?.[0];
}

export async function getUserEmail(email: string) {
  const { data } = await supabase.from("users").select("*").eq("email", email).single();
  return data;
}

export async function createUser(newUser: object) {
  const { data, error } = await supabase.from("users").insert([newUser]).select();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

export async function getAllUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return users;
}
