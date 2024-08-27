import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { createUser, deleteUser, findUserIdByKindeID } from "@/lib/db/user";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

type KindeUserEventData = {
  authorization: { org_code: string };
  user: { id: string };
};

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken == null ) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const { header } = decodedToken;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    const event = (await jwt.verify(token, signingKey)) as {
      type: string;
      data: KindeUserEventData;
    };

    // Handle various events
    switch (event?.type) {
      case "user.authenticated":
        const user = await findUserIdByKindeID(event.data.user.id);
        if (!user) {
          // Create new user if not found
          await createUser({
            id: uuid(), // Generate a unique ID for the user
            kinde_id: event.data.user.id,
            name: event.data.authorization.org_code,
            email: `user_${event.data.user.id}@kinde.com`,
          });
          console.log(`Created new user ${event.data.user.id}`);
        }
        break;
      case "user.updated":
        console.log("Data: ", event.data);
        break;
      case "user.created":
        await createUser({
          id: uuid(), // Generate a unique ID for the user
          kinde_id: event.data.user.id,
          name: event.data.authorization.org_code,
          email: `user_${event.data.user.id}@kinde.com`,
        });
        console.log(`Created new user ${event.data.user.id}`);
        break;
      case "user.deleted":
        deleteUser(event.data.user.id).catch((err) =>
          console.error(`Error deleting user ${event.data.user.id}:`, err)
        );
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
