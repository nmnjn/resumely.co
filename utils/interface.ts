import { Json } from "@/types/supabase";

export interface QuestionsResponse {
  error: string;
  data: {
    question: string;
    follow_ups: string[];
    key_points: string[];
  }[];
  metadata:
    | {
        name: string;
        current_role: string;
        current_company: string;
        skills: string[];
      }
    | undefined;
}

export interface JDMatchResponse {
  error: string;
  rating: number | null;
  feedback: string[];
  suggestions: string[];
  metadata:
    | {
        name: string;
        job_description_role: string;
        job_description_company: string;
      }
    | undefined;
}

export interface Generation {
  action: string | null;
  created_at: string;
  email: string | null;
  file_name: string | null;
  id: number;
  model: string | null;
  response: Json;
  user_id: string | null;
}
