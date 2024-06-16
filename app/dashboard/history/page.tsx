import { getGenerations } from "./actions";
import { Suspense } from "react";
import { HistoryView } from "../../../components/HistoryView";
import { TypographyMuted } from "@/components/ui/typography";

export async function Spinner() {
  return (
    <div className="w-full flex h-[calc(100vh-100px)]">
      <div className="m-auto">
        <TypographyMuted>Loading...</TypographyMuted>
      </div>
    </div>
  );
}

export async function Message({ text }: { text: string }) {
  return (
    <div className="w-full flex h-[calc(100vh-100px)]">
      <div className="m-auto">
        <TypographyMuted>{text}</TypographyMuted>
      </div>
    </div>
  );
}

export default async function History() {
  const generations = await getGenerations();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        {generations && generations.length > 0 ? (
          <HistoryView generations={generations} />
        ) : (
          <>
            <Message text="As you use Resumely, your previous search results will start showing up here!"></Message>
          </>
        )}
      </Suspense>
    </>
  );
}
