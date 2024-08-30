"use client";

import React, { useState } from "react";
import { removeMemberFromBoard } from "@/lib/actions/boardActions";
import { Role } from "@/db/schema";

interface Member {
  id: number;
  userId: string;
  role: Role;
  updateAt: Date;
}

interface MemberListProps {
  boardId: string;
  initialMembers: Member[];
}

export default function MemberList({
  boardId,
  initialMembers,
}: MemberListProps) {
  const [members, setMembers] = useState(initialMembers);

  async function handleRemoveMember(memberId: number) {
    await removeMemberFromBoard(boardId, memberId);
    setMembers(members.filter((member) => member.id !== memberId));
  }

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <div>
            <p className="font-semibold">{member.userId}</p>
          </div>
          <button
            onClick={() => handleRemoveMember(member.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
