"use client";

import { addQuestion } from "@/app/actions/addQuestion";
import { InputField, OptionSelect, SelectField } from "@/components/formfields";

import { technologies } from "@/data";
import { AddQuestionform } from "@/types/common";
import { validateField } from "@/utils/validateQuestionForm";
import dynamic from "next/dynamic";
import { useState } from "react";

const Tiptap = dynamic(() => import("@/components/Tiptap"), { ssr: false });

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; message: string }
  | { type: "flagged"; reason: string };

export const AddQuestionForm = () => {
  const [formData, setFormData] = useState<AddQuestionform>({
    answer: "",
    difficulty: "easy",
    question: "",
    tech: "react",
  });
  const [error, setError] = useState<AddQuestionform>({
    answer: "",
    difficulty: "",
    question: "",
    tech: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const errorMessage =
      validateField(name as keyof AddQuestionform, value) ?? "";

    setError((prev) => ({ ...prev, [name]: errorMessage }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (value: string) => {
    const errorMessage = validateField("answer", value) ?? "";
    setError((prev) => ({ ...prev, answer: errorMessage }));
    setFormData((prev) => ({ ...prev, answer: value }));
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questionErr = validateField("question", formData.question);
    const answerErr = validateField("answer", formData.answer);
    if (questionErr || answerErr) {
      setError((prev) => ({
        ...prev,
        question: questionErr ?? "",
        answer: answerErr ?? "",
      }));
      return;
    }

    setStatus({ type: "loading" });

    const result = await addQuestion(formData);

    if (result.message === "success") {
      setStatus({ type: "success" });
      setFormData({ answer: "", difficulty: "easy", question: "", tech: "react" });
      setError({ answer: "", difficulty: "", question: "", tech: "" });
    } else if (result.message === "flagged") {
      setStatus({ type: "flagged", reason: result.reason });
    } else {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  if (status.type === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#1e293b]">Question Submitted!</h3>
        <p className="text-sm text-[#64748b] mt-1">
          Your question has been posted to the community.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: "idle" })}
          className="mt-6 px-5 py-2 rounded-lg bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors"
        >
          Add Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {status.type === "flagged" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-50 border border-rose-200">
          <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-rose-800">Content Flagged</p>
            <p className="text-sm text-rose-600 mt-0.5">{status.reason}</p>
          </div>
        </div>
      )}

      {status.type === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-50 border border-rose-200">
          <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-rose-800">Error</p>
            <p className="text-sm text-rose-600 mt-0.5">{status.message}</p>
          </div>
        </div>
      )}

      <InputField
        placeholder="e.g. How do you handle merge conflicts in Git?"
        label="Question"
        value={formData?.question}
        name="question"
        error={error.question}
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <SelectField
          label="Technology"
          error={error.tech}
          name="tech"
          value={formData.tech}
          onChange={handleChange}
          options={technologies}
        />

        <div className="md:col-span-2">
          <OptionSelect
            label="Difficulty"
            required
            value={formData.difficulty}
            onChange={(val) => {
              setFormData((prev) => ({
                ...prev,
                difficulty: val,
              }));
            }}
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#1e293b] mb-1.5 block">
          Answer
        </label>
        <Tiptap handleChange={handleAnswerChange} />
        {error.answer && (
          <span className="text-rose-500 text-xs mt-1 block">{error.answer}</span>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Checking...
            </>
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus({ type: "idle" });
            setFormData({ answer: "", difficulty: "easy", question: "", tech: "react" });
            setError({ answer: "", difficulty: "", question: "", tech: "" });
          }}
          className="px-6 py-2.5 rounded-lg border border-[#e2e8f0] text-[#64748b] text-sm font-medium hover:bg-[#f8fafc] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
