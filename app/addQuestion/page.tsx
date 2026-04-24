import { AddQuestionForm } from "@/components/addQuestion/AddQuestionForm";

const page = () => {
  return (
    <main className="section-wrap w-[90%] md:w-[80%] bg-white mt-10 rounded-[20px] p-5 md:p-8">
      <h1 className="mainTitle ">
        Add Questions you may came across on your Interview
      </h1>
      <p className="subHeading">Help the Developers to ace their interviews</p>

      <div className="my-10 ">
        <AddQuestionForm />
      </div>
    </main>
  );
};

export default page;
