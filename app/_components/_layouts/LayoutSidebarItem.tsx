import { SidebarItem } from "@/app/_types/data-types";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  item: SidebarItem;
  isMessages?: boolean;
  isFriends?: boolean;
}

export default function LayoutSidebarItem({ item, isMessages, isFriends }: Props) {
  const { id, conversation_id, image, display_name, name } = item;

  function getLink() {
    switch (true) {
      case isMessages:
        return `/messages/${conversation_id}`;
      case isFriends:
        return `/friends/${id}`;
      default:
        return "/";
    }
  }

  const link = getLink();

  return (
    <Link
      className="p-2 rounded-lg block w-full hover:bg-gray-200"
      key={id || conversation_id}
      href={link}
    >
      <div className="flex gap-4 relaative">
        <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center">
          {image ? (
            <img
              src={image}
              alt={`${display_name || name}`}
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          ) : (
            <UserGroupIcon className="w-7 h-7 text-gray-400" />
          )}
        </span>
        <h3 className="font-semibold">{name || display_name}</h3>
      </div>
    </Link>
  );
}
