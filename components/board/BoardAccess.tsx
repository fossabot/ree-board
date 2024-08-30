import { Suspense } from "react";
import AddMemberForm from "./AddMemberForm";
import MemberList from "./MemberList";
import { fetchMembersByBoardID } from "@/lib/db/member"; // Assume this function exists to fetch board members

interface BoardAccessProps {
  boardId: string;
}

export default async function BoardAccess({ boardId }: BoardAccessProps) {
  const members = await fetchMembersByBoardID(boardId);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage Board Access</h2>
      <AddMemberForm boardId={boardId} />
      <Suspense fallback={<div>Loading members...</div>}>
        <MemberList boardId={boardId} initialMembers={members} />
      </Suspense>
    </div>
  );
}
