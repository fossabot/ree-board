"use client"

import React from "react";
import { boardSignalInitial } from "@/lib/signal/boardSignals";
import type { Board } from "@/db/schema";
import { useSignal } from "@preact/signals-react";

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
  useSignal();

  return (
    <>
      {children}
    </>
  );
};
