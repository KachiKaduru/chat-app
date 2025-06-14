import { Metadata } from "next";
import Link from "next/link";
import { loginWithGoogle } from "../_lib/actions/user-actions";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return (
    <section className="flex flex-col gap-8 p-4 items-center justify-center">
      <h1>Login</h1>

      <div className="flex flex-col gap-5">
        <form action={loginWithGoogle}>
          <button className="w-fit">Login with your Google account</button>
        </form>

        <h1>OR</h1>

        <form action="" className="flex flex-col gap-4">
          <input type="email" name="" placeholder="Enter your email..." />
          <input type="password" name="" placeholder="password.." />
          <button className="w-fit">Login</button>
        </form>
      </div>

      <p>
        Don&apos;t have an account? <Link href={"/signup"}>Signup</Link>
      </p>
    </section>
  );
}
