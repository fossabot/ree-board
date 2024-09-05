import type { BoardState } from "@/db/schema";
import { signal } from "@preact/signals-react";
import { fetchBoards } from "@/lib/db/board";

export interface Board {
  id: string;
  title: string;
  state: BoardState;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  creator?: string | null | undefined;
}

// Create a signal to store the boards
export const boardSignal = signal<Board[]>([]);

export const boardSignalInitial = async (userID: string) => {
  boardSignal.value = await fetchBoards(userID);
};

export const addBoard = (newBoard: Board) => {
  boardSignal.value = [...boardSignal.value, newBoard];
};

export const removeBoard = (boardId: string) => {
  const index = boardSignal.value.findIndex((board) => board.id === boardId);
  if (index !== -1) {
    boardSignal.value = [
      ...boardSignal.value.slice(0, index),
      ...boardSignal.value.slice(index + 1),
    ];
  }
};
