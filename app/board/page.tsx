import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

import BoardList from "@/components/BoardList";
import NavBar from "@/components/NavBar";
import { fetchBoards } from "@/lib/db/board";
import { boardsSignal } from "@/lib/signal/board";

const getCachedBoards = unstable_cache(
  async (userId) => fetchBoards(userId),
  ["user_boards"]
);

export default async function Boards() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }

  const boards = await getCachedBoards(user.id);
  boardsSignal.value = boards

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
