"use client";

import type { Role } from "@/db/schema";
import { addMemberToBoard } from "@/lib/actions/boardActions";
import React, { useState } from "react";
import MemberList from "./MemberList";

interface MemberManageProps {
  boardId: string;
  members: MemberInfo[];
}

export interface MemberInfo {
  id: number;
  userId: string;
  role: Role;
  username: string;
  email: string;
  updateAt: Date;
}

export default function MemberManage({ boardId, members }: MemberManageProps) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      await addMemberToBoard(boardId, email.trim());
      setEmail("");
    }
  }

  return (
    <>
      <button
        className="btn mx-4"
        onClick={() => {
          const modal = document.getElementById(
            "member_manage_modal"
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Manage Members
      </button>
      <dialog id="member_manage_modal" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full p-2 mr-0.5 border rounded"
              required
            />
            <button type="submit" className="mt-2 btn btn-primary">
              Add Member
            </button>
          </form>
          <div className="m-2">
            <MemberList boardId={boardId} members={members} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
}
