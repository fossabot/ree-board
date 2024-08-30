import { BoardAccess, BoardGrid } from "@/components/board";
import { BoardProvider } from "@/components/board/BoardProvider";
import { NavBar } from "@/components/common";
import { fetchPostsByBoardID } from "@/lib/db/post";
import { postSignal } from "@/lib/signal/postSignals";
import React from "react";

const fetchInitialPosts = async (boardId: string) => {
  const posts = await fetchPostsByBoardID(boardId);
  postSignal.value = posts;
};

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const boardID = params.id;

  await fetchInitialPosts(boardID);

  return (
    <>
      <NavBar />
      <BoardProvider>
        <div className="container mx-auto w-full max-w-full px-4">
          <BoardAccess boardId={boardID}/>
          <BoardGrid boardID={boardID} />
        </div>
      </BoardProvider>
    </>
  );
}
