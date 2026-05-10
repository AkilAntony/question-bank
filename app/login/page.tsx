import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      <div className="section-wrap px-4 pt-10">
        <div className="max-w-md mx-auto card p-6 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#1e293b]">Welcome Back</h1>
            <p className="text-[#64748b] mt-1.5 text-sm">
              Log in to continue sharing interview questions
            </p>
          </div>
          <Suspense fallback={<div className="h-64" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
