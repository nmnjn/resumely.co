export interface GeneratorResponse {
  error: string;
  data: {
    question: string;
    follow_ups: string[];
    key_points: string[];
  }[];
}
