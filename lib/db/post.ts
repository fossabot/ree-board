import { postTable } from "@/db/schema";
import { db } from "./client";
import { eq } from "drizzle-orm";

type NewPost = typeof postTable.$inferInsert;

export const createPost = async (post: NewPost) => {
  await db.insert(postTable).values({
    content: post.content,
    author: post.author,
    boardId: post.boardId,
    type: post.type,
  });
};

export const fetchPostsByBoardID = async (boardId: number) => {
  return await db
    .select()
    .from(postTable)
    .where(eq(postTable.boardId, boardId))
    .orderBy(postTable.createdAt);
};
