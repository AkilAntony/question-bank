import { getDb } from "@/lib/db";
import { Question } from "@/types/common";

export async function getQuestions(): Promise<Question[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("questions")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      question: doc.question,
      answer: doc.answer,
      tech: doc.tech,
      difficulty: doc.difficulty,
      createdAt: doc.createdAt,
    }));
  } catch {
    return [];
  }
}
