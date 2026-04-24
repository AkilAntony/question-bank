"use client";

import { InputField, OptionSelect, SelectField } from "@/components/formfields";
import TiptapComponent from "@/components/Tiptap";
import { technologies } from "@/data";
import { AddQuestionform } from "@/types/common";
import { validateField } from "@/utils/common";
import { useState } from "react";

export const AddQuestionForm = () => {
  const [formData, setFormData] = useState<AddQuestionform>({
    answer: "",
    difficulty: "",
    question: "",
    tech: "",
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

  console.log(formData);

  return (
    <form>
      <div className="md:w-[90%]  flex flex-col gap-6 mx-auto ">
        <InputField
          placeholder="eg : How will you resolve merge conflicts?"
          label="Enter the quesiton"
          value={formData?.question}
          name="question"
          error={error.question}
          onChange={handleChange}
        />

        <div className="grid md:grid-cols-3 gap-4">
          <SelectField
            label="Select the Technology"
            error={error.tech}
            name="tech"
            value={formData.tech}
            onChange={handleChange}
            options={technologies}
          />

          <div className="md:col-span-2 flex gap-1 flex-col ">
            <OptionSelect
              label="Difficulty Level"
              required
              value={formData.difficulty}
              onChange={(val) => {
                setFormData((prev) => ({
                  ...prev,
                  difficulty: val,
                }));
                console.log(val, "a");
              }}
              options={[
                { label: "Easy", value: 1 },
                { label: "Medium", value: 2 },
                { label: "Hard", value: 3 },
              ]}
            />
          </div>
        </div>

        <TiptapComponent />
      </div>
    </form>
  );
};
