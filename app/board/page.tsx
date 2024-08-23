import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { redirect } from "next/navigation";

import BoardList from "@/components/home/BoardList";
import { NavBar } from "@/components/common";

export default async function Boards() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Boards</h1>
        <BoardList userID={user.id} />
      </main>
    </div>
  );
}
