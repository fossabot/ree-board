import { signal } from "@preact/signals-react";

export interface Board {

}

// Create a signal to store the boards
export const boardsSignal = signal<Board[]>([]);

export const createBoard = (newPost: Board) => {
  boardsSignal.value = [...boardsSignal.value, newPost];
};

export const removePost = (boardId: number) => {
  boardsSignal.value = boardsSignal.value.filter((board) => board.id !== boardId);
};
