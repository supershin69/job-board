// components/Navbar.tsx
import { auth } from "@/auth";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import Image from "next/image";


const links = [
    { name: "Home", href: "/"},
    { name: "Jobs", href: "/jobs"},
    { name: "People", href: "/people"},
    { name: "Company", href: "/companies"}
]

export default async function Navbar() {
    const session = await auth();
    const isLoggedIn = !!session;
    const userId = session?.user?.id;
    let user = null;


    if (userId) {
        user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
        },
        });
    }
    const hasProfilePic = !!user?.profile?.photo_url;
  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">Job Board</Link>
      <div className="flex gap-12">
        {links.map((link) => {

            return (
                <Link
                    key={link.name}
                    href={link.href}
                >
                    {link.name}
                </Link>
            )
        })}
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link 
            href="/dashboard" 
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-600 hover:border-white transition-all"
          >
            {hasProfilePic ? (
              <Image
                src="globe.svg" 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              // Fallback if no profile pic exists
              <div className="flex h-full w-full items-center justify-center bg-gray-600 text-sm font-medium">
                {session.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium hover:text-gray-300"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
}