"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FileCog, OctagonAlert, User, UserCog } from "lucide-react";

const links = [
    { name: "General", href: "/dashboard/admin", icon: User},
    { name: "Profile", href: "/dashboard/admin/profile", icon: User },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: UserCog },
    { name: "Manage Jobs", href: "/dashboard/admin/manage-jobs", icon: FileCog },
    { name: "Reports", href: "/dashboard/admin/reports", icon: OctagonAlert },
];


export default function AdminNavLinks() {
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