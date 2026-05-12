"use client";

import { Power } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex h-12 w-full items-center justify-center gap-2 rounded bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <Power className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}
