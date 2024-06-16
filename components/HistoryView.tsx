"use client";

import {
  Generation,
  JDMatchResponse,
  QuestionsResponse,
} from "@/utils/interface";
import { useEffect, useState, useRef } from "react";
import GenerationTile from "./GenerationTile";
import QuestionsResponseCard from "./QuestionsResponseCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Json } from "@/types/supabase";
import JDMatchResponseCard from "./JDMatchResponseCard";

export function HistoryView({
  generations,
}: {
  generations: Generation[] | null;
}) {
  const [selectedGeneration, selectGeneration] = useState<Generation>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedGeneration && !!generations) {
      selectGeneration(
        generations.filter((generation) => {
          return generation.action === "GENQV1";
        })[0]
      );
    }
  }, [generations]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedGeneration]);

  function getQuestionsResponse(response: Json): QuestionsResponse {
    return JSON.parse(JSON.stringify(selectedGeneration?.response));
  }

  function getJDMatchResponse(response: Json): JDMatchResponse {
    return JSON.parse(JSON.stringify(selectedGeneration?.response));
  }

  return (
    <div className="flex max-h-[calc(100vh-64px)]">
      <div className="min-w-[300px] max-w-[300px]">
        <Tabs defaultValue="questions">
          <div className="mx-4 my-2 ">
            <TabsList className="w-full">
              <TabsTrigger value="questions" className="w-full">
                Questions
              </TabsTrigger>
              <TabsTrigger value="jd-matches" className="w-full">
                JD Matches
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="overflow-y-scroll max-h-[calc(100vh-120px)]">
            <TabsContent value="questions">
              {generations
                ?.filter((generation) => {
                  return generation.action === "GENQV1";
                })
                .map((generation, index) => {
                  return (
                    <div className="mr-4">
                      <GenerationTile
                        generation={generation}
                        isSelected={selectedGeneration?.id === generation.id}
                        onClick={selectGeneration}
                      />
                    </div>
                  );
                })}
            </TabsContent>
            <TabsContent value="jd-matches">
              {generations
                ?.filter((generation) => {
                  return generation.action === "GENJDV1";
                })
                .map((generation, index) => {
                  return (
                    <div className="mr-4">
                      <GenerationTile
                        generation={generation}
                        isSelected={selectedGeneration?.id === generation.id}
                        onClick={selectGeneration}
                      />
                    </div>
                  );
                })}
            </TabsContent>
          </div>
        </Tabs>
        <div className=""></div>
      </div>
      <div ref={contentRef} className="overflow-y-scroll px-2">
        {selectedGeneration?.action === "GENQV1" ? (
          <QuestionsResponseCard
            questionsResponse={getQuestionsResponse(
              selectedGeneration.response
            )}
          />
        ) : (
          <></>
        )}
        {selectedGeneration?.action === "GENJDV1" ? (
          <JDMatchResponseCard
            jdMatchResponse={getJDMatchResponse(selectedGeneration.response)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
