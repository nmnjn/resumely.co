import {
  Generation,
  JDMatchResponse,
  QuestionsResponse,
} from "@/utils/interface";
import { cn, convertTimestampToLocalTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH5,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export default function GenerationTile({
  generation,
  isSelected,
  onClick,
}: {
  generation: Generation;
  isSelected: boolean;
  onClick: (generation: Generation) => void;
}) {
  function getQuestionsResponseTile(generation: Generation) {
    const generationData: QuestionsResponse = JSON.parse(
      JSON.stringify(generation.response)
    );
    return (
      <>
        <TypographyH5>{generationData.metadata?.name}</TypographyH5>
        <TypographyMuted>
          {generationData.metadata?.current_role} at{" "}
          {generationData.metadata?.current_company}
        </TypographyMuted>
      </>
    );
  }

  function getJDMatchResponseTile(generation: Generation) {
    const generationData: JDMatchResponse = JSON.parse(
      JSON.stringify(generation.response)
    );
    return (
      <>
        <TypographyH5>{generationData.metadata?.name}</TypographyH5>
        <TypographyMuted>
          for {generationData.metadata?.job_description_role} at{" "}
          {generationData.metadata?.job_description_company}
        </TypographyMuted>
      </>
    );
  }

  return (
    <div>
      <button
        className={cn(
          "w-full text-left space-y-4 rounded-lg my-2 ml-2",
          isSelected ? "bg-primary/10" : ""
        )}
        onClick={() => onClick(generation)}
      >
        <div className="my-3 mx-4 space-y-2">
          <div>
            {generation.action === "GENQV1" ? (
              getQuestionsResponseTile(generation)
            ) : (
              <></>
            )}
            {generation.action === "GENJDV1" ? (
              getJDMatchResponseTile(generation)
            ) : (
              <></>
            )}
          </div>
          <p className="text-sm font-medium leading-none text-foreground/50 text-left pt-2">
            {convertTimestampToLocalTime(generation.created_at)}
          </p>
        </div>
      </button>
      <Separator />
    </div>
  );
}
