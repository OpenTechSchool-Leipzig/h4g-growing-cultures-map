import {QuizStep} from "./quiz-step.interface";

export interface QuizDetail {
  title: string,
  description: string,
  steps: QuizStep[]
}
