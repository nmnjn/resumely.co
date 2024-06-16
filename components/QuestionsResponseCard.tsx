import { QuestionsResponse } from "@/utils/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH3,
  TypographyH4,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function QuestionsResponseCard({
  questionsResponse,
}: {
  questionsResponse: QuestionsResponse | undefined;
}) {
  if (!questionsResponse) {
    return <></>;
  }

  return (
    <div>
      <div className="py-4 space-y-4 mr-4">
        {questionsResponse.data.map((question, index) => {
          return (
            <Card id={`${index}`} className="animate-in">
              <CardHeader className="space-y-2">
                <TypographyP>Question {index + 1}</TypographyP>
                <TypographyH3>{question.question}</TypographyH3>
              </CardHeader>
              <CardContent className="space-y-4">
                <TypographyMuted>Follow Up Questions</TypographyMuted>
                <TypographyList>
                  {question.follow_ups.map((follow_up_question, index) => {
                    return (
                      <li id={`${index}`}>
                        <TypographyH4>{follow_up_question}</TypographyH4>
                      </li>
                    );
                  })}
                </TypographyList>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Show Hints</Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="space-y-4 overflow-y-scroll"
                  >
                    <SheetHeader>
                      <TypographyP>Question {index + 1}</TypographyP>
                      <TypographyH3>{question.question}</TypographyH3>
                    </SheetHeader>
                    <TypographyMuted>
                      Pointers that can be used in the answer.
                    </TypographyMuted>
                    <TypographyList>
                      {question.key_points.map((key_point, index) => {
                        return (
                          <li id={`${index}`}>
                            <TypographyH4>{key_point}</TypographyH4>
                          </li>
                        );
                      })}
                    </TypographyList>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
