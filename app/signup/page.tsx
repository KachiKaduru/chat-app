import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup | ChatSphere",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928dab] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#2d2a3a]/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="text-[#d1d1d1]">Join ChatSphere today</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.141-2.674-6.735-2.674-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.065-1.285-0.182-1.861h-9.818z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="mx-4 text-white/50 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full bg-[#3a3646] border border-[#3a3646] focus:border-[#928dab] focus:ring-1 focus:ring-[#928dab] rounded-lg px-4 py-3 text-white placeholder-[#928dab]/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full bg-[#3a3646] border border-[#3a3646] focus:border-[#928dab] focus:ring-1 focus:ring-[#928dab] rounded-lg px-4 py-3 text-white placeholder-[#928dab]/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-white/80">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="w-full bg-[#3a3646] border border-[#3a3646] focus:border-[#928dab] focus:ring-1 focus:ring-[#928dab] rounded-lg px-4 py-3 text-white placeholder-[#928dab]/50 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#928dab] hover:bg-[#a7a2c1] text-[#1f1c2c] font-medium py-3 px-4 rounded-lg transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-[#d1d1d1]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#928dab] hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
