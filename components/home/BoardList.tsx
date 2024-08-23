"use client";

import React, { useEffect } from "react";
import BoardCard from "./home/BoardCard";
import CreateBoardForm from "./home/CreateBoardForm";
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
          className="w-64 h-32 bg-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-200 transition-colors"
        >
          <BoardCard boardID={board.id}>
            <span className="text-lg font-semibold">{board.title}</span>
          </BoardCard>
        </div>
      ))}
    </div>
  );
}
