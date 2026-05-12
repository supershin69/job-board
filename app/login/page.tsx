import { loginUser } from "../lib/actions";

function Page() {
  return (
    <form action={loginUser}>
        <input type="email" name="email" placeholder="Enter your email..." required className="border-2 border-gray-200 py-2 px-3" />
        <input type="password" name="password" placeholder="Enter your password..." required className="border-2 border-gray-200 py-2 px-3" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Login
        </button>
    </form>
  )
}
export default Page