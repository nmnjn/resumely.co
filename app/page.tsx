import AuthButton from "@/components/AuthButton";
import Header from "@/components/Header";
import { getUser } from "./actions";
import Generator from "@/components/Generator";

export default async function ProtectedPage() {
  const user = await getUser(false);
  return (
    <div className="flex-1 w-full flex flex-col gap-16 items-center">
      <div className="w-full">
        {/* {!user ? (
          <div className="py-6 font-bold bg-purple-950 text-center">
            Login is required to prevent the service from abuse! I know it is not
          ideal!
          </div>
        ) : (
          <></>
        )} */}

        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {/* <DeployButton /> */}
            <div>Resumely</div>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-8 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <Generator isAuthenticated={user != null} />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-sm">
        <p>
          {/* Built by{" "}
          <a
            href="https://nmnjn.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            nmnjn
          </a>
          <br /> */}
          Powered by llama3-8b-8192 with{" "}
          <a
            href="https://groq.com/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Groq
          </a>
        </p>
      </footer>
    </div>
  );
}
