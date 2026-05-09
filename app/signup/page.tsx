import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      <div className="section-wrap px-4 pt-10">
        <div className="max-w-md mx-auto card p-6 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#1e293b]">Create an Account</h1>
            <p className="text-[#64748b] mt-1.5 text-sm">
              Sign up to share interview questions with the community
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
