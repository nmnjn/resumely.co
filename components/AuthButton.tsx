import { signOut } from "@/app/login/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUser } from "@/utils/supabase/utils";

export default async function AuthButton() {
  const user = await getUser(false);
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.name || user.email}!
      <form action={signOut}>
        <Button variant="secondary">Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="">
      <Button>Login</Button>
    </Link>
  );
}
