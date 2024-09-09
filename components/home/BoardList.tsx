"use client";

import { boardSignal } from "@/lib/signal/boardSignals";
import React from "react";
import BoardCard from "./BoardCard";

interface BoardListProps {
  userID: string;
}

export default function BoardList({ userID }: BoardListProps) {
  return (
    <>
      {boardSignal.value.map((board) => (
        <div key={board.id} className="flex items-center justify-center">
          <BoardCard boardId={board.id} title={board.title} userId={userID} deletable={board.creator==userID}/>
        </div>
      ))}
    </>
  );
}
