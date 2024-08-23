"use client";

import React from "react";

export default function PostCard({ postContent }: { postContent: string }) {
  return (
    <>
      <div className="card bg-neutral text-neutral-content mb-2 p-2 rounded-lg shadow hover:bg-gray-50 cursor-pointer">
        <div className="card-body items-center text-center">
          <p>{postContent}</p>
        </div>
      </div>
    </>
  );
}
