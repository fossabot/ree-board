import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { findUserIdByKindeID } from "@/lib/db/user";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  console.log("Req:", req);
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken == null ) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    console.log("Decoded token:", decodedToken);
    const { header } = decodedToken;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey) as { type: string; data: any };;

    console.log(event.data);
    // Handle various events
    switch (event?.type) {
      case "user.authenticated":
        console.log("User authenticated:", event.data);
        break;
      case "user.updated":
        // handle user updated event
        // e.g update database with event.data
        console.log(event.data);
        break;
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        console.log(event.data);
        break;
      case "user.deleted":
        break;
      default:
        // other events that we don't handle
        break;
    }

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
