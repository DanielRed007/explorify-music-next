import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const clientId = process.env.WEB_SPOTIFY_API_CLIENT_ID;
    const clientSecret = process.env.WEB_SPOTIFY_API_CLIENT_SECRET;

    const codedId = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch(process.env.SPOTIFY_CLIENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + codedId,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error posting to external API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
