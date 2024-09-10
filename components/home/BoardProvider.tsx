"use client"

import React from "react";
import { boardSignalInitial } from "@/lib/signal/boardSignals";
import type { Board } from "@/db/schema";
import { useEffectOnce } from "@/lib/utils/effect";

interface BoardProviderProps {
  children: React.ReactNode;
  initialBoards: Board[];
}

export const BoardProvider: React.FC<BoardProviderProps> = ({
  children,
  initialBoards,
}) => {

  // Initialize the boardSignal with the initial data
  useEffectOnce(() => {
    boardSignalInitial(initialBoards);
  });

  return (
    <>
      {children}
    </>
  );
};
