import { JDMatchResponse } from "@/utils/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { Badge } from "./ui/badge";

export default function JDMatchResponseCard({
  jdMatchResponse,
}: {
  jdMatchResponse: JDMatchResponse | undefined;
}) {
  if (!!!jdMatchResponse || jdMatchResponse.rating === null) {
    return <></>;
  }

  console.log(jdMatchResponse);

  return (
    <div>
      <div className="py-4 space-y-4 mr-4">
        <Card className="animate-in">
          <CardHeader className="space-y-2">
            {/* <TypographyP></TypographyP> */}
            <TypographyH3>
              JD Match Rating: {jdMatchResponse.rating}/10
            </TypographyH3>
          </CardHeader>
          <CardContent className="space-y-4">
            <TypographyMuted>Feedback:</TypographyMuted>
            <TypographyList>
              {jdMatchResponse.feedback.map((feedback, index) => {
                return (
                  <li id={`${index}`}>
                    <TypographyH4>{feedback}</TypographyH4>
                  </li>
                );
              })}
            </TypographyList>
            <TypographyMuted>Suggestions:</TypographyMuted>
            {jdMatchResponse.suggestions.map((suggestion, index) => {
              return (
                <div id={`${index}`}>
                  <Card className="p-4">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-sm">
                        ✨{" "}
                        <div className="text-foreground/80 ml-1">Suggested</div>
                      </Badge>
                      <TypographyH4>{suggestion}</TypographyH4>
                    </div>
                  </Card>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
