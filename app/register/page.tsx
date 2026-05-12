import { registerUser } from "../lib/actions"

function Page() {
  return (
    <form action={registerUser}>
        <input type="text" name="name" placeholder="Enter your name..." required className="border-2 border-gray-200 py-2 px-3" />
        <input type="email" name="email" placeholder="Enter your email..." required className="border-2 border-gray-200 py-2 px-3" />
        <input type="password" name="password" placeholder="Enter your password..." required className="border-2 border-gray-200 py-2 px-3" />
        <select name="role" required className="border-2 border-gray-200 py-2 px-3">
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Employer</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Register
        </button>
    </form>
  )
}
export default Page