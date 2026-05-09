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

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type AuthState =
  | { errors?: { name?: string; email?: string; password?: string }; message?: string }
  | undefined;