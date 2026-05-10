import { createSession } from "@/lib/session";
import { getDb } from "@/lib/db";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/login?error=google-auth-failed", req.url));

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return NextResponse.redirect(new URL("/login?error=google-not-configured", req.url));

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/+$/, "").trim();
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  const client = new OAuth2Client(clientId, clientSecret, redirectUri);

  try {
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    if (!idToken) return NextResponse.redirect(new URL("/login?error=google-auth-failed", req.url));

    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    console.log(payload,'testing payload')
    if (!payload || !payload.email) return NextResponse.redirect(new URL("/login?error=google-auth-failed", req.url));

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split("@")[0];

    const db = await getDb();
    const users = db.collection("users");

    let user = await users.findOne({ $or: [{ googleId }, { email }] });

    if (user && !user.googleId) {
      await users.updateOne({ _id: user._id }, { $set: { googleId } });
    }

    if (!user) {
      const result = await users.insertOne({
        name,
        email,
        googleId,
        createdAt: new Date().toISOString(),
      });
      user = { _id: result.insertedId };
    }

    await createSession(user._id.toString());
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.redirect(new URL("/login?error=google-auth-failed", req.url));
  }
}
