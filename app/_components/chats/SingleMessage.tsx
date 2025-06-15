import { getSingleUser } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";
import { User } from "next-auth";

export default async function SingleMessage({ sender_id = "", children = "" }) {
  const sender: User = await getSingleUser(sender_id);
  const { user } = (await auth())!;
  const isUserMessage = sender_id === user?.id;

  return (
    <div
      className={`bg-green-400 p-2 border border-[#ccc] w-fit max-w-[40dvw] ${
        isUserMessage ? "self-end" : "self-start"
      }`}
    >
      <h2 className="font-semibold mb-2">{sender.name}</h2>
      <p>{children}</p>
    </div>
  );
}
