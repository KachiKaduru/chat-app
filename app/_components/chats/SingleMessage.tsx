import { User } from "@/app/_types/users-type";

interface Props {
  children: React.ReactNode;
  sender: User | any;
  user: any;
}

export default function SingleMessage({ children = "", sender, user }: Props) {
  const isUserMessage = sender.id === user.id;

  return (
    <div
      className={`text-black p-2 border border-[#ccc] w-fit max-w-[40dvw] rounded-lg ${
        isUserMessage
          ? "bg-purple-700 self-end text-white"
          : " bg-[#f3f3f3] border-none self-start"
      }`}
    >
      <h2 className="font-semibold mb-2">{sender.name}</h2>
      <p>{children}</p>
    </div>
  );
}
