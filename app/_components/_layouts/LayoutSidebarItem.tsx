import { SidebarItem } from "@/app/_types/data-types";
import { userDateJoinedFormatted } from "@/app/_utils/date-helpers";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  item: SidebarItem;
  isMessages?: boolean;
  isFriends?: boolean;
}

export default function LayoutSidebarItem({ item, isMessages, isFriends }: Props) {
  const { id, conversation_id, image, display_name, name, last_message, created_at } = item;

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
      className="p-2 rounded-lg block w-full hover:bg-gray-200 shadow-md"
      key={id || conversation_id}
      href={link}
    >
      <div className="flex gap-4 relative items-center">
        <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={`${display_name || name}`}
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          ) : (
            <UserGroupIcon className="w-6 h-6 text-gray-400" />
          )}
        </span>
        <div>
          <h3 className="font-semibold">{name || display_name}</h3>
          <p className="text-gray-600 text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
            {last_message || userDateJoinedFormatted(created_at)}
          </p>
        </div>
      </div>
    </Link>
  );
}
