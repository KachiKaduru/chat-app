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
      className={`text-white p-2 border border-[#ccc] w-fit max-w-[40dvw] rounded-lg ${
        isUserMessage ? "bg-green-700 self-end" : " bg-gray-700 self-start"
      }`}
    >
      <h2 className="font-semibold mb-2">{sender.name}</h2>
      <p>{children}</p>
    </div>
  );
}
