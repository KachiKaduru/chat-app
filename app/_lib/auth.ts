import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createUser, getUserEmail } from "./actions/user-actions";

const authConfig = {
  providers: [
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email address" },
        username: { label: "Username", type: "text", placeholder: "e.g @ilovechatapp" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUserEmail(user.email);
        if (!existingUser)
          await createUser({ name: user.name, email: user.email, image: user.image });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const createdUser = await getUserEmail(session.user.email);
      session.user.id = createdUser.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
