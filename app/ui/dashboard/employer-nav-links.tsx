"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { User, NotebookPen, Bookmark, Send } from "lucide-react";

const links = [
    { name: "General", href: "/dashboard/employer", icon: User},
    { name: "Profile", href: "/dashboard/employer/profile", icon: User },
    { name: "Job Applications", href: "/dashboard/employer/applications", icon: NotebookPen },
    { name: "Saved Jobs", href: "/dashboard/employer/saved-jobs", icon: Bookmark },
    { name: "Post Job", href: "/dashboard/employer/post-job", icon: Send },
];

export default function EmployerNavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = pathname === link.href;

                return (
                    <Link 
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-12 items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600" : isActive,
                            }
                        )}
                    >
                        <LinkIcon className="h-4 w-4" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    );
}