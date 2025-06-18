import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <section className="flex flex-col gap-8 p-4 items-center justify-center bg-[#343A40] text-white w-full h-screen">
      <h1 className="font-bold text-2xl">Signup</h1>

      <div className="flex flex-col gap-5">
        <button className="w-full p-2 cursor-pointer border-2 border-gray-600 rounded-md text-center hover:bg-[#333333] ">
          Sign up with your Google account
        </button>

        <h1 className="mx-auto">OR</h1>

        {/* <form action="" className="flex flex-col gap-4">
          <input type="email" name="" placeholder="Enter your email..." />
          <input type="password" name="" placeholder="password.." />
          <button className="w-fit">Sign Up</button>
        </form> */}
        <form action="" className="flex flex-col gap-4">
          <input
            type="email"
            name=""
            placeholder="Enter your email..."
            className="bg-gray-600 p-3 rounded-sm"
          />
          <input
            type="password"
            name=""
            placeholder="password.."
            className="bg-gray-600 p-3 rounded-sm"
          />
          <button className="w-full border-2 border-gray-700 text-center px-2 py-3 cursor-pointer rounded-sm">
            Sign Up
          </button>
        </form>
      </div>

      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
    </section>
  );
}
