import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { unstable_cache } from "next/cache";

import BoardCard from "@/components/BoardCard";
import NavBar from "@/components/NavBar";
import { fetchBoards } from "@/lib/db/board";
import { redirect } from "next/navigation";

const getCachedBoards = unstable_cache(
  async (userId) => fetchBoards(userId),
  ["user_boards"]
);

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect("/api/auth/login");
  }

  const boards = await getCachedBoards(user.id); // replace 1 with actual user ID
  return (
    <>
      <NavBar />
      <BoardCard boardID={-1}>
        <div className="size-4/6 place-content-center">
          <FontAwesomeIcon className="text-3xl" icon={faSquarePlus} />
        </div>
      </BoardCard>
      {boards.map((board) => (
        <BoardCard key={board.board.id} boardID={board.board.id}>
          {board.board.title}
        </BoardCard>
      ))}
    </>
  );
}
