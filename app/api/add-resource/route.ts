import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDb();

    const doc = {
      question: body.question,
      answer: body.answer,
      tech: body.tech,
      difficulty: body.difficulty,
      createdAt: new Date().toISOString(),
    };

    await db.collection("questions").insertOne(doc);

    return Response.json({ message: "success" });
  } catch (error) {
    console.error("Error saving question:", error);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
