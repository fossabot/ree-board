import { memberTable } from "@/db/schema";
import { db } from "./client";
import { and, eq } from "drizzle-orm";

type NewMember = typeof memberTable.$inferInsert;

export const addUserToBoard = async (newMember: NewMember) => {
  await db.insert(memberTable).values({
    userId: newMember.userId,
    boardId: newMember.boardId,
    role: newMember.role,
  });
};

export const removeUserFromBoard = async (userID: string, boardID: number) => {
  await db
    .delete(memberTable)
    .where(
      and(
        eq(memberTable.userId, userID),
        eq(memberTable.boardId, boardID)
      )
    )
    .execute();
};
