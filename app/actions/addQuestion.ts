"use server";

import { AddQuestionform } from "@/types/common";

export const addQuestion = async (formData: AddQuestionform) => {

    console.log(formData,'testing form data in action')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-resource`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );
};
