// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!redirectUri) {
    console.error("Redirect URI is not set in environment variables");
    return NextResponse.json(
      { error: "Redirect URI not configured" },
      { status: 500 }
    );
  }

  console.log("Using Redirect URI:", redirectUri); // Debugging statement

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  });

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.WEB_SPOTIFY_API_CLIENT_ID}:${process.env.WEB_SPOTIFY_API_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token } = response.data;

    // Construct the absolute URL for the redirect
    const redirectUrl = `${process.env.NEXTAUTH_URL}/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`;
    console.log("Redirecting to:", redirectUrl); // For debugging purposes

    return NextResponse.redirect(redirectUrl); // Use absolute URL
  } catch (error) {
    console.error("Error exchanging code for tokens", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
