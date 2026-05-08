"use client";

import { addQuestion } from "@/app/actions/addQuestion";
import { InputField, OptionSelect, SelectField } from "@/components/formfields";

import { technologies } from "@/data";
import { AddQuestionform } from "@/types/common";
import { validateField } from "@/utils/validateQuestionForm";
import dynamic from "next/dynamic";
import { useState } from "react";

const Tiptap = dynamic(() => import("@/components/Tiptap"), { ssr: false });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    const errorMessage =
      validateField(name as keyof AddQuestionform, value) ?? "";

    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnswerChange = (value: string) => {
    const errorMessage = validateField("answer", value) ?? "";
    setError((prev) => ({
      ...prev,
      answer: errorMessage,
    }));

    setFormData((prev) => ({
      ...prev,
      answer: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addQuestion(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
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
          className="px-6 py-2.5 rounded-lg bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg border border-[#e2e8f0] text-[#64748b] text-sm font-medium hover:bg-[#f8fafc] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
