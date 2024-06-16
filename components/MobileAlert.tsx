"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MonitorCheck } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export default function MobileAlert() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
    defaultValue: true,
  });

  if (isDesktop) {
    return <></>;
  }

  return (
    <Alert className="bg-primary/10">
      <MonitorCheck size={24} className="mt-3" />
      <div className="ml-2 -mb-2">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Please use the desktop version for all supported features currently.
        </AlertDescription>
      </div>
    </Alert>
  );
}
