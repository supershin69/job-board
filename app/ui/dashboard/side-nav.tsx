'use client'

import AdminNavLinks from "./admin-nav-links";
import EmployerNavLinks from "./employer-nav-links";
import SeekerNavLinks from "./seeker-nav-links";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

function SideNav() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/dashboard/admin");
  const isEmployerPath = pathname.startsWith("/dashboard/employer");
  const isSeekerPath = pathname.startsWith("/dashboard/seeker");

  return (
    <div className="flex flex-col h-full py-4">
      
      <nav className="flex-1 overflow-y-auto space-y-2">
        {isAdminPath && <AdminNavLinks />}
        {isEmployerPath && <EmployerNavLinks />}
        {isSeekerPath && <SeekerNavLinks />}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <LogoutButton />
      </div>
      
    </div>
  );
}
export default SideNav;