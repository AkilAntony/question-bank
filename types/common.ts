export interface AddQuestionform {
  question: string;
  answer: string;
  tech: string;
  difficulty: string;
}

export interface Question extends AddQuestionform {
  _id: string;
  createdAt: string;
}

export interface Option {
  label: string;
  value: string | number;
}