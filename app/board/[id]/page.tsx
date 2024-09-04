import { BoardAccess, BoardGrid } from "@/components/board";
import { BoardProvider } from "@/components/board/BoardProvider";
import { NavBar } from "@/components/common";
import { checkMemberRole } from "@/lib/db/member";
import { fetchPostsByBoardID } from "@/lib/db/post";
import { findUserIdByKindeID } from "@/lib/db/user";
import { postSignal } from "@/lib/signal/postSignals";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const fetchInitialPosts = async (boardId: string) => {
  const posts = await fetchPostsByBoardID(boardId);
  postSignal.value = posts;
};

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const boardID = params.id;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/api/auth/login");
  }
  const userID = await findUserIdByKindeID(user.id);

  if (!userID) {
    throw new Error("User not found");
  }

  const role = await checkMemberRole(userID, boardID);

  if (role === null) {
    redirect("/boards");
  }

  await fetchInitialPosts(boardID);

  return (
    <>
      <NavBar />
      <BoardProvider>
        <div className="container mx-auto w-full max-w-full px-4">
          <BoardAccess boardId={boardID}/>
          <BoardGrid boardID={boardID} />
        </div>
      </BoardProvider>
    </>
  );
}
