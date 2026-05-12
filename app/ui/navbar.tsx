// components/Navbar.tsx
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/"},
    { name: "Jobs", href: "/jobs"},
    { name: "People", href: "/people"},
    { name: "Company", href: "/companies"}
]

export default function Navbar() {
    const pathname = usePathname();
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">Job Board</Link>
      <div className="flex gap-4">
        {links.map((link) => {

            const isActive = pathname === link.href;

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
    </nav>
  );
}