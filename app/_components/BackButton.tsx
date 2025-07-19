"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function BackButton({ className = "" }: Props) {
  const router = useRouter();

  return (
    <button className={`pr-2 text-lg ${className}`} onClick={() => router.back()}>
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );
}
