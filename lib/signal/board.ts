import { BoardState } from "@/db/schema";
import { signal } from "@preact/signals-react";

export interface Board {
  id: number;
  title: string;
  state: BoardState;
}

// Create a signal to store the boards
export const boardsSignal = signal<Board[]>([]);

export const addBoard = (newBoard: Board) => {
  boardsSignal.value = [...boardsSignal.value, newBoard];
};

export const removeBoard = (boardId: number) => {
  boardsSignal.value = boardsSignal.value.filter((board) => board.id !== boardId);
};
