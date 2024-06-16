import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/theme-provider-toggle";
import { FileHeartIcon, Gem, GemIcon, IceCream2 } from "lucide-react";

export default function NavBar({ showName }: { showName: boolean }) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <div className="flex space-x-4 items-center text-md font-medium ">
          {showName ? (
            <div className="flex items-center gap-x-2 text-foreground/80">
              <GemIcon />
              Resumely
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex space-x-4 items-center">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
