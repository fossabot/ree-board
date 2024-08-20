"use server";

import { boardTable, Role, userTable } from "@/db/schema";
import { db } from "./client";
import { eq } from "drizzle-orm";
import { findUserIdByKindeID } from "./user";
import { addUserToBoard } from "./boardUser";

export async function fetchBoards(userId: string, useKindeId: boolean = true) {
  if (userId === null) {
    throw new Error("User ID is required");
  }
  if (useKindeId) {
    // Fetch boards by Kinde ID
    return await db
      .select()
      .from(boardTable)
      .where(eq(userTable.kinde_id, userId));
  } else {
    // Fetch boards by user ID
    return await db.select().from(boardTable).where(eq(userTable.id, userId));
  }
}

export type NewBoard = typeof boardTable.$inferInsert;

export async function createBoard(newBoard: NewBoard, kindeId: string) {
  const userId = await findUserIdByKindeID(kindeId);
  const board = await db
    .insert(boardTable)
    .values({
      id: newBoard.id,
      title: newBoard.title,
      state: newBoard.state,
      creator: userId,
    })
    .returning({ id: boardTable.id })
    .execute();
  if (board.length > 0) {
    await addUserToBoard({
      userId: userId,
      boardId: board[0].id,
      role: Role.owner,
    });
    return board[0].id;
  } else {
    throw new Error("Failed to create board");
  }
}
