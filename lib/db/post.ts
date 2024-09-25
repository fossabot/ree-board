import type { NewPost, PostType } from "@/db/schema";
import { postTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "./client";

export const createPost = async (post: NewPost) => {
  const newPosts = await db
    .insert(postTable)
    .values({
      id: post.id,
      content: post.content,
      author: post.author,
      boardId: post.boardId,
      type: post.type,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
    .returning();

  return newPosts[0];
};

export const fetchPostsByBoardID = async (boardId: string) => {
  return await db
    .select()
    .from(postTable)
    .where(eq(postTable.boardId, boardId));
};

export const deletePost = async (postId: string) => {
  await db.delete(postTable).where(eq(postTable.id, postId)).execute();
};

export const updatePostType = async (id: string, newType: PostType) => {
  await db
    .update(postTable)
    .set({
      type: newType,
      updatedAt: new Date(),
    })
    .where(eq(postTable.id, id))
    .execute();
};

export const updatePostContent = async (id: string, newContent: string) => {
  await db
    .update(postTable)
    .set({
      content: newContent,
      updatedAt: new Date(),
    })
    .where(eq(postTable.id, id))
    .execute();
}
