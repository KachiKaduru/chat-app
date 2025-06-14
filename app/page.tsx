import Link from "next/link";

export default async function RootHomePage() {
  return (
    <div>
      <h1>Hello</h1>

      <div>
        <Link href={"/chats"}>Chats</Link>
      </div>
    </div>
  );
}
