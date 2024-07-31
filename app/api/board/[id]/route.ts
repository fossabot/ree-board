import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next/types";

export const GET = async function board(
  req: NextApiRequest
) {
  const res = new NextResponse();
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Not authenticated", status: 401 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 }, res);
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred", status: 500 },
        res
      );
    }
  }
};
