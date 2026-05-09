"use server";

import { getDb } from "@/lib/db";
import { moderateContent } from "@/lib/moderation";
import { AddQuestionform } from "@/types/common";
import { getCurrentUserId } from "@/app/actions/auth";

export const addQuestion = async (formData: AddQuestionform) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return { message: "error" as const };
    }

    const moderation = await moderateContent(formData.question, formData.answer);

    if (moderation.flagged) {
      return {
        message: "flagged" as const,
        reason: moderation.reason ?? "Content was flagged by our moderation system.",
      };
    }

    const db = await getDb();

    const doc = {
      question: formData.question,
      answer: formData.answer,
      tech: formData.tech,
      difficulty: formData.difficulty,
      createdAt: new Date().toISOString(),
    };
    await db.collection("questions").insertOne(doc);

    return { message: "success" as const };
  } catch (error) {
    console.error("Error saving question:", error);
    return { message: "error" as const };
  }
};
