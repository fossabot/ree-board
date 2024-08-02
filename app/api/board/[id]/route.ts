import { boardTable, memberTable, Role, userTable } from "@/db/schema";
import { db } from "@/lib/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function board(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = new NextResponse();
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Not authenticated", status: 401 });
    }

    const boardID = params.id;
    console.info(`Fetching board: ${boardID}`);

    // Fetch user info
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    // Check if the user has permission to access the board
    const hasPermission = await checkPermissions(+boardID, user.id, Role.guest);
    if (!hasPermission) {
      return NextResponse.json({ error: "Access denied", status: 403 });
    }

    // Fetch and return the board data
    const boardData = await db.select().from(boardTable).where(eq(boardTable.id, +boardID));

    return NextResponse.json({ board: boardData }, res);
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

const checkPermissions = async (
  boardID: number,
  userID: string,
  minimalRole: Role
): Promise<boolean> => {
  const userRole = await db
    .select({ role: memberTable.role })
    .from(memberTable)
    .innerJoin(userTable, eq(memberTable.userId, userTable.id))
    .where(
      and(eq(userTable.kinde_id, userID), eq(memberTable.boardId, boardID))
    );
  if (userRole.length > 0) {
    return userRole[0].role <= minimalRole;
  }
  return false;
};
