"use client";

import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      {state?.message && !state?.errors && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-600">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-[#1e293b]">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className={`px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors ${state?.errors?.email ? "border-rose-300 ring-1 ring-rose-300" : "border-[#e2e8f0] focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"}`}
        />
        {state?.errors?.email && <span className="text-rose-500 text-xs">{state.errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-[#1e293b]">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          className={`px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors ${state?.errors?.password ? "border-rose-300 ring-1 ring-rose-300" : "border-[#e2e8f0] focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"}`}
        />
        {state?.errors?.password && <span className="text-rose-500 text-xs">{state.errors.password}</span>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 rounded-lg bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-sm text-[#64748b]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#4f46e5] hover:underline font-medium">Sign up</Link>
      </p>
    </form>
  );
}
