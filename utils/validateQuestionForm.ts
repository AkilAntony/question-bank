import { AddQuestionform } from "@/types/common";


export const validateField = (
  name: keyof AddQuestionform,
  value: string
) => {
  const trimmedValue = value.trim();

  // Remove HTML tags for plain text validation
  const plainText = trimmedValue.replace(/<[^>]*>/g, "").trim();
  console.log(trimmedValue,'trimmer')

  console.log(plainText,'plain text')

  const onlySpecialChars =
    /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(plainText);

  switch (name) {
    case "question":
      if (!trimmedValue) {
        return "Question is mandatory";
      }

      if (trimmedValue.length < 5) {
        return "Question must be at least 5 characters";
      }

      if (onlySpecialChars) {
        return "Question cannot contain only special characters";
      }

      return "";

    case "answer":
      // Tiptap empty content often becomes: <p></p>
      if (!plainText) {
        return "Please give the answer for your question";
      }

      if (plainText.length < 3) {
        return "Answer must be at least 3 characters";
      }

      if (onlySpecialChars) {
        return "Answer cannot contain only special characters";
      }

      return "";

    default:
      return "";
  }
};