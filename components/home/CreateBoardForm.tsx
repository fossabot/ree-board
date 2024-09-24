"use client";

import React from "react";
import { addBoard, removeBoard } from "@/lib/signal/boardSignals";
import { BoardState, type NewBoard } from "@/db/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { nanoid } from "nanoid";
import { authenticatedCreateBoard } from "@/lib/actions/authenticatedDBActions";
import { addToast } from "@/lib/signal/toastSignals";
import { redirect } from "next/navigation";

export default function CreateBoardForm() {
  const { user, getUser } = useKindeBrowserClient();
  const alsoUser = getUser();

  if (!user || !alsoUser) {
    redirect("/");
  }

  const createNewBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const title = titleInput.value.trim();
    if (title === "") return;

    const newBoardID = nanoid();
    const newBoard: NewBoard & { id: string, createdAt: Date, updatedAt: Date, creator: string | null } = {
      id: newBoardID,
      title,
      state: BoardState.active,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: user.id,
    };

    // Optimistically update the UI
    addBoard(newBoard);
    form.reset();

    try {
      await authenticatedCreateBoard(newBoard, user.id);
    } catch (error) {
      console.error("Failed to create board:", error);
      addToast("Failed to create board. Please try again later.", "error");
      removeBoard(newBoardID); // Remove the temporary board from the UI if failed to create it
    }
  };

  return (
    <form
      onSubmit={createNewBoard}
      className="w-64 h-32 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
    >
      <input
        type="text"
        name="title"
        placeholder="Create new board"
        className="mt-2 w-full text-center bg-transparent border-none focus:outline-none text-gray-600"
      />
      <button type="submit" className=""></button>
    </form>
  );
}
