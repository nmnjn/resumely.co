import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { signIn, signUp, signInWithGoogle } from "./actions";
import Image from "next/image";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <div className="animate-in">
        <div className="text-foreground/50 text-sm text-center">
          Login is required to prevent the service from abuse!
          <br />I know it is not ideal!
        </div>
        <form>
          <SubmitButton
            formAction={signInWithGoogle}
            className="bg-white border border-foreground/20 rounded-md px-4 py-2 mt-6 mb-2 w-full"
            pendingText="Signing In..."
          >
            <div className="flex items-center space-x-4 justify-center text-slate-700">
              <Image
                src={"/assets/google.png"}
                alt="Google Logo"
                width={18}
                height={18}
                className="mr-2"
              />
              Sign In with Google
            </div>
          </SubmitButton>
        </form>
        <div className="text-foreground/50 text-sm text-center my-4">
          ~ or, continue with an account below ~
        </div>
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <SubmitButton
            formAction={signUp}
            className="bg-green-700 rounded-md px-4 py-2 text-white mb-2"
            pendingText="Signing In..."
          >
            Continue
          </SubmitButton>
          {/* <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 rounded-md bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
