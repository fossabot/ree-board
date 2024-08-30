"use client";

import React, { useState } from "react";
import { addMemberToBoard } from "@/lib/actions/boardActions";

interface AddMemberFormProps {
  boardId: string;
}

export default function AddMemberForm({ boardId }: AddMemberFormProps) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      await addMemberToBoard(boardId, email.trim());
      setEmail("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Member
      </button>
    </form>
  );
}
