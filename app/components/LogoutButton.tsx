"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-600 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}
