import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const name = session?.user?.name ?? 'Seeker';
  return (
    <div>
      <h1>Welcome {name}</h1>
    </div>
  );
}
