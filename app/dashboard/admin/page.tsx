import { auth } from "@/auth"

async function Page() {
    const session = await auth();
    const name = session?.user?.name ?? 'Admin';
  return (
    <div>Welcome {name}</div>
  )
}
export default Page