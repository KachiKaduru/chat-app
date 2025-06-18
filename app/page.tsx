import Link from "next/link";

export default async function RootHomePage() {
  return (
    <div className="w-full justify-center items-center bg-[#343A40] text-white grid">
      <h1>Hello</h1>

      <div>
        <Link href={"/chats"}>To Chats page</Link>
      </div>
    </div>
  );
}
