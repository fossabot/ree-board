import { BoardState } from "@/db/schema";
import { signal } from "@preact/signals-react";
import { fetchBoards } from "@/lib/db/board";

export interface Board {
  id: number;
  title: string;
  state: BoardState;
  createdAt: Date;
  updatedAt: Date;
  creator: string | null;
}

// Create a signal to store the boards
export const boardsSignal = signal<Board[]>([]);

export const addBoard = (newBoard: Board) => {
  boardsSignal.value = [...boardsSignal.value, newBoard];
};

export const removeBoard = (boardId: number) => {
  boardsSignal.value = boardsSignal.value.filter(
    (board) => board.id !== boardId
  );
};
