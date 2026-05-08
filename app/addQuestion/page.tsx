import { AddQuestionForm } from "@/components/addQuestion/AddQuestionForm";

const page = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      <div className="section-wrap px-4 pt-10">
        <div className="card p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">
              Add a Question
            </h1>
            <p className="text-[#64748b] mt-1.5">
              Share an interview question you&apos;ve encountered to help others prepare
            </p>
          </div>
          <AddQuestionForm />
        </div>
      </div>
    </div>
  );
};

export default page;
