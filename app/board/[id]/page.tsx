import { BoardAccess, BoardGrid } from "@/components/board";
import { AnonymousModeProvider } from "@/components/board/AnonymousModeProvider";
import { PostProvider } from "@/components/board/PostProvider";
import { NavBar } from "@/components/common";
import { ToastSystem } from "@/components/common/ToastSystem";
import { Role } from "@/db/schema";
import { fetchMembersByBoardID } from "@/lib/db/member";
import { fetchPostsByBoardID } from "@/lib/db/post";
import { findUserIdByKindeID } from "@/lib/db/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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

  const [posts, members] = await Promise.all([
    fetchPostsByBoardID(boardID),
    fetchMembersByBoardID(boardID)
  ]);
  const role = members.find((m) => m.userId === userID)?.role;

  if (role === undefined) {
    redirect("/board");
  }
  const viewOnly = role === Role.guest;

  return (
    <>
      <NavBar />
      <AnonymousModeProvider>
        <PostProvider initialPosts={posts} initialMembers={members}>
          <div className="container mx-auto w-full max-w-full px-4">
            <div className="flex justify-end">
              <BoardAccess boardId={boardID} role={role} />
            </div>
            <BoardGrid boardID={boardID} viewOnly={viewOnly}/>
          </div>
        </PostProvider>
      </AnonymousModeProvider>
      <ToastSystem />
    </>
  );
}
