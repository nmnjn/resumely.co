export const questionsFromResumeInitialState = {
  message: "",
  data: {
    error: "",
    data: [
      // {
      //   question:
      //     "Can you walk me through your experience with backend development, specifically with C# and .NET? How did you integrate React for the frontend?",
      //   follow_ups: [
      //     "What was the main challenge you faced during the integration?",
      //     "How did you handle errors or exceptions in your code?",
      //     "Can you elaborate on the robust MD5 hashing techniques you employed?",
      //   ],
      //   key_points: [
      //     "Technical skills: .NET, C#, React",
      //     "Problem-solving skills: backend development, integration",
      //   ],
      // },
      // {
      //   question:
      //     "In your previous internship at Ernst & Young, what was the problem you were trying to solve, and how did you propose an architecture to improve data analysis flexibility and efficiency?",
      //   follow_ups: [
      //     "Can you describe the data analysis task you were working on?",
      //     "How did you measure the improvement in runtime speed?",
      //     "What were the key features you identified in your proposed architecture?",
      //   ],
      //   key_points: [
      //     "Problem-solving skills: data analysis, improvement",
      //     "Technical skills: data analysis, architecture",
      //   ],
      // },
    ],
    metadata: {
      name: "",
      current_role: "",
      current_company: "",
      skills: [],
    },
  },
};

export const jdMatchGeneratorInitialState = {
  message: "",
  data: {
    error: "",
    rating: null,
    feedback: ["feedback 1", "feedback 2"],
    suggestions: [],
    metadata: {
      name: "",
      job_description_role: "",
      job_description_company: "",
    },
  },
};
