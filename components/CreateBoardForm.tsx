"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addBoard, removeBoard } from "@/lib/signal/board";
import { createBoard, NewBoard } from "@/lib/db/board";
import { BoardState } from "@/db/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function CreateBoardForm() {
  const { user, getUser } = useKindeBrowserClient();
  const alsoUser = getUser();

  if (!user || !alsoUser) {
    return null; // User not authenticated
  }

  const createNewBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const title = titleInput.value;
    if (!title.trim()) return;

    const tempID = Date.now();
    const newBoard: NewBoard = { id: tempID, title, state: BoardState.active };

    // Optimistically update the UI
    addBoard({ id: tempID, ...newBoard });
    form.reset();

    // Here you would typically make an API call to create the board
    try {
      const newID = await createBoard(newBoard, user.id);
      removeBoard(tempID);
      addBoard({ id: newID, ...newBoard }); // Add the new board
    } catch (error) {
      console.error("Failed to create board:", error);
      // removeBoard(tempID); // Remove the temporary board from the UI if failed to create it
    }
  };

  return (
    <form onSubmit={createNewBoard} className="w-64 h-32">
      <button
        type="submit"
        className="w-full h-full bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
      >
        <PlusIcon className="h-8 w-8 text-gray-600" />
        <input
          type="text"
          name="title"
          placeholder="Create new board"
          className="mt-2 w-full text-center bg-transparent border-none focus:outline-none text-gray-600"
        />
      </button>
    </form>
  );
}
