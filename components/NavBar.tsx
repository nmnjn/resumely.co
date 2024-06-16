import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/theme-provider-toggle";
import { Button } from "./ui/button";
import { TypographyH4 } from "./ui/typography";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <div className="flex space-x-4 items-center">
          {/* Resumely */}
          {/* <Button>History</Button> */}
        </div>

        <div className="flex space-x-4 items-center">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
