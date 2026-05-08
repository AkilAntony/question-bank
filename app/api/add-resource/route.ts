import { getDb } from "@/lib/db";
import { moderateContent } from "@/lib/moderation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, tech, difficulty } = body;

    const moderation = await moderateContent(question, answer);

    if (moderation.flagged) {
      return Response.json(
        { message: "flagged", reason: moderation.reason ?? "Content was flagged by our moderation system." },
        { status: 400 },
      );
    }

    const db = await getDb();

    const doc = {
      question,
      answer,
      tech,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    await db.collection("questions").insertOne(doc);

    return Response.json({ message: "success" });
  } catch (error) {
    console.error("Error saving question:", error);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
