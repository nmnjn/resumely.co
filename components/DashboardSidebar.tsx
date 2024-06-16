"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GemIcon, LucideIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Archive, Inbox, Search, Settings } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "./ui/separator";

import { useMediaQuery } from "usehooks-ts";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { TypographyP } from "./ui/typography";

interface SidebarLinkButtonProps {
  title: string;
  href: string;
  label?: string;
  icon: LucideIcon;
  selected: boolean;
}

const sidebarLinks = [
  {
    title: "New Questions",
    href: "/dashboard/new",
    icon: Search,
    selected: false,
  },
  {
    title: "JD Match",
    href: "/dashboard/match",
    icon: Inbox,
    selected: false,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: Archive,
    selected: false,
  },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  //   selected: false,
  // },
];

export function SidebarLinkButton(props: SidebarLinkButtonProps) {
  return (
    <Link
      href={props.href}
      className={cn(
        buttonVariants({
          variant: props.selected ? "default" : "ghost",
          size: "lg",
        }),
        "justify-start w-full mt-2 gap-2 px-3"
      )}
    >
      <props.icon className="h-4 w-4" />
      {props.title}
    </Link>
  );
}

export default function DashboardSidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const pathname = usePathname();
  function isSelected(href: string) {
    return pathname?.startsWith(href);
  }

  if (!isDesktop) {
    return <></>;
  }

  return (
    <aside className="w-[240px] max-w-sx h-screen fixed left-0 top-0 z-1000 border-r bg-background">
      <div className="w-full h-16 flex justify-start items-center p-3 space-x-2">
        <div className="text-md text-center align-center rounded-md font-medium mb px-2 py-1 text-foreground/80">
          <div className="flex items-center gap-x-2">
            <GemIcon />
            Resumely
          </div>
        </div>
      </div>
      <div className="animate-in h-full px-4">
        {sidebarLinks.map((sidebarLink, index) => (
          <SidebarLinkButton
            key={index}
            title={sidebarLink.title}
            href={sidebarLink.href}
            icon={sidebarLink.icon}
            selected={isSelected(sidebarLink.href)}
          ></SidebarLinkButton>
        ))}
      </div>

      <div className="w-full absolute left-0 bottom-0 mb-8">
        <Separator />
        <div className="mt-4 text-sm text-center">
          {" "}
          <TypographyP>
            Powered by
            <br />
            llama3-8b-8192 with{" "}
            <a
              href="https://groq.com/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Groq
            </a>{" "}
            <br />
            and gpt-4o by{" "}
            <a
              href="https://openai.com/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Open AI
            </a>
          </TypographyP>
        </div>
      </div>
    </aside>
  );
}
