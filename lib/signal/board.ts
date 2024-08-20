import { BoardState } from "@/db/schema";
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
export const boardsSignal = signal<Board[]>([]);

export const addBoard = (newBoard: Board) => {
  boardsSignal.value = [...boardsSignal.value, newBoard];
};

export const removeBoard = (boardId: string) => {
  boardsSignal.value = boardsSignal.value.filter(
    (board) => board.id !== boardId
  );
};
