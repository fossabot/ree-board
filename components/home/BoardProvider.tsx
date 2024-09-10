"use client"

import React from "react";
import { boardSignalInitial } from "@/lib/signal/boardSignals";
import type { Board } from "@/db/schema";

interface BoardProviderProps {
  children: React.ReactNode;
  initialBoards: Board[];
}

export const BoardProvider: React.FC<BoardProviderProps> = ({
  children,
  initialBoards,
}) => {

  // Initialize the boardSignal with the initial data
  boardSignalInitial(initialBoards);

  return (
    <>
      {children}
    </>
  );
};
