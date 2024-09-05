"use client";

import React, { useEffect } from "react";
import BoardCard from "./BoardCard";
import CreateBoardForm from "./CreateBoardForm";
import { boardSignal, boardSignalInitial } from "@/lib/signal/boardSignals";
import { useSignals } from "@preact/signals-react/runtime";

export default function BoardList({ userID }: { userID: string }) {
  useEffect(() => {
    boardSignalInitial(userID);
  }, [userID]);

  useSignals();

  return (
    <div className="flex flex-wrap gap-4">
      <CreateBoardForm />
      {boardSignal.value.map((board) => (
        <div
          key={0}
          className="flex items-center justify-center"
        >
          <BoardCard id={board.id} title={board.title} />
        </div>
      ))}
    </div>
  );
}
