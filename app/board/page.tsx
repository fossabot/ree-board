import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

import BoardCard from "@/components/BoardCard";
import NavBar from "@/components/NavBar";
import { fetchBoards } from "@/lib/db/board";
import CreateBoardForm from "@/components/CreateBoardForm";
import { boardsSignal } from "@/lib/signal/board";

const getCachedBoards = unstable_cache(
  async (userId) => fetchBoards(userId),
  ["user_boards"]
);

function BoardList() {
  return (
    <div className="flex flex-wrap gap-4">
      {boardsSignal.value.map((board) => (
        <div
          key={board.board.id}
          className="w-64 h-32 bg-blue-100 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-200 transition-colors"
        >
          <BoardCard boardID={board.board.id}>
            <span className="text-lg font-semibold">{board.board.title}</span>
          </BoardCard>
        </div>
      ))}
      <CreateBoardForm />
    </div>
  );
}

export default async function Boards() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }

  const boards = await getCachedBoards(user.id);
  boardsSignal.value = boards;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Boards</h1>
        <BoardList />
      </main>
    </div>
  );
}
