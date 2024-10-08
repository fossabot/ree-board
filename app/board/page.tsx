import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import { NavBar } from "@/components/common";
import { BoardList, CreateBoardForm } from "@/components/home";
import { fetchBoards } from "@/lib/db/board";
import { BoardProvider } from "@/components/home/BoardProvider";
import { ToastSystem } from "@/components/common/ToastSystem";

export default async function Boards() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }

  const initialBoardList = await fetchBoards(user.id);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Your Boards</h1>
          <div className="flex flex-wrap gap-4">
            <BoardProvider initialBoards={initialBoardList}>
              <CreateBoardForm />
              <BoardList userID={user.id} />
            </BoardProvider>
          </div>
        </div>
        <ToastSystem />
      </div>
    </>
  );
}
