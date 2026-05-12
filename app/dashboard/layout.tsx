import SideNav from "../ui/dashboard/side-nav";

function layout({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex h-full flex-col md:flex-row overflow-hidden">
        <div className="w-full flex-none md:w-64 border-r border-gray-200">
            <SideNav />
        </div>
        <div className="grow overflow-y-auto p-6 md:p-12 bg-gray-50">{children}</div>
    </div>
  )
}
export default layout