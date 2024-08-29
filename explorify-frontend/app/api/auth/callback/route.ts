// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
  });

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    return NextResponse.redirect(
      `/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`
    );
  } catch (error) {
    console.error("Error exchanging code for tokens", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
