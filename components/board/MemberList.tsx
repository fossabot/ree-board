"use client";

import { removeMemberFromBoard } from "@/lib/actions/boardActions";
import React from "react";
import type { MemberInfo } from "./MemberManage";

interface MemberListProps {
  boardId: string;
  members: MemberInfo[];
}

export default function MemberList({
  boardId,
  members,
}: MemberListProps) {

  async function handleRemoveMember(memberId: number) {
    await removeMemberFromBoard(boardId, memberId);
  }

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <div>
            <p className="font-semibold">{member.username}</p>
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
