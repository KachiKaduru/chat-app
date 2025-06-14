import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <section className="flex flex-col gap-8 p-4 items-center justify-center">
      <h1>Signup</h1>

      <div className="flex flex-col gap-5">
        <button className="w-fit">Sign up with your Google account</button>

        <h1>OR</h1>

        <form action="" className="flex flex-col gap-4">
          <input type="email" name="" placeholder="Enter your email..." />
          <input type="password" name="" placeholder="password.." />
          <button className="w-fit">Sign Up</button>
        </form>
      </div>

      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
    </section>
  );
}
