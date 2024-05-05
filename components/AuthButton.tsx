import { signOut } from "@/app/login/actions";
import { getUser } from "@/app/protected/actions";
import Link from "next/link";

export default async function AuthButton() {
  const user = await getUser(false);
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.name || user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
