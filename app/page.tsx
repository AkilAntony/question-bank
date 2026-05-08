import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Question } from "@/types/common";

export const dynamic = "force-dynamic";

async function getQuestions(): Promise<Question[]> {
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

const difficultyConfig: Record<string, { label: string; ring: string; bg: string; text: string }> = {
  easy: {
    label: "Easy",
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  medium: {
    label: "Medium",
    ring: "ring-amber-500/20",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  hard: {
    label: "Hard",
    ring: "ring-rose-500/20",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
};

export default async function Home() {
  const questions = await getQuestions();

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      <div className="section-wrap px-4">
        <div className="py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
            Interview Question Bank
          </h1>
          <p className="mt-3 text-[#64748b] text-lg max-w-lg mx-auto">
            Browse real interview questions and answers shared by the developer community
          </p>
        </div>

        {questions.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-[#64748b] text-lg font-medium">
              No questions yet
            </p>
            <p className="text-[#94a3b8] mt-1">
              Be the first to share a question you came across!
            </p>
            <Link
              href="/addQuestion"
              className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors"
            >
              Add a Question
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {questions.map((q) => {
              const diff = difficultyConfig[q.difficulty] || difficultyConfig.easy;
              return (
                <div
                  key={q._id}
                  className="card p-6 md:p-8 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-[#1e293b] leading-relaxed">
                      {q.question}
                    </h2>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ${diff.ring} ${diff.bg} ${diff.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${q.difficulty === "easy" ? "bg-emerald-500" : q.difficulty === "medium" ? "bg-amber-500" : "bg-rose-500"}`} />
                      {diff.label}
                    </span>
                  </div>

                  {q.answer && (
                    <div
                      className="text-[#475569] text-sm leading-relaxed mb-5 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:bg-[#1e293b] [&_pre]:text-[#e2e8f0] [&_pre]:rounded-lg [&_pre]:p-3 [&_code]:bg-[#f1f5f9] [&_code]:px-1.5 [&_code]:rounded [&_pre_code]:bg-transparent [&_pre_code]:p-0"
                      dangerouslySetInnerHTML={{ __html: q.answer }}
                    />
                  )}

                  <div className="flex items-center justify-between text-sm pt-4 border-t border-[#e2e8f0]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f1f5f9] text-[#64748b] text-xs font-medium capitalize">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      {q.tech}
                    </span>
                    <time className="text-[#94a3b8] text-xs">
                      {new Date(q.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
