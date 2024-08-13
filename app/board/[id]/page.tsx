import NavBar from "@/components/NavBar";
import { boardTable, postTable } from "@/db/schema";
import { db } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import React from "react";

const retrieveCachedBoard = unstable_cache(
  async (boardID) => {
    return await db
      .select()
      .from(boardTable)
      .innerJoin(postTable, eq(postTable.boardId, boardTable.id))
      .where(eq(boardTable.id, boardID))
      .execute();
  },
  ["board_posts"]
);

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const boardID = params.id;

  const board = await retrieveCachedBoard(boardID);

  if (!board) {
    return (
      <>
        <div>Board not found</div>
        <a href="/board">return to board view</a>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto w-full max-w-full px-4 min-h-[80vh]">
        <div className="flex w-full h-full min-h-[80vh]">
          <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">
            went_well
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">
            to_improvement
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">
            to_discuss
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid flex-grow place-items-center">
            action_item
          </div>
        </div>
      </div>
    </>
  );
}
