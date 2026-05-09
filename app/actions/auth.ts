"use server";

import { getDb } from "@/lib/db";
import { createSession, deleteSession, getSession } from "@/lib/session";
import { AuthState } from "@/types/common";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(state: AuthState, formData: FormData): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { name?: string; email?: string; password?: string } = {};

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email";
  if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";

  if (Object.keys(errors).length > 0) return { errors, message: "Validation failed" };

  const db = await getDb();
  const existing = await db.collection("users").findOne({ email });
  if (existing) return { errors: { email: "Email already registered" }, message: "Conflict" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    role : ''
  });

  await createSession(result.insertedId.toString());
  redirect("/");
}

export async function login(state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { email?: string; password?: string } = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) return { errors, message: "Validation failed" };

  const db = await getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) return { errors: { email: "Invalid email or password" }, message: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { errors: { email: "Invalid email or password" }, message: "Invalid credentials" };

  await createSession(user._id.toString());
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.userId ?? null;
}
