"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface BoardCardProps {
  children: ReactNode;
  boardID?: number;
}

const BoardCard: React.FC<BoardCardProps> = ({ children, boardID = -1 }) => {
  const router = useRouter();
  const handleClick = () => {
    if (boardID != -1) {
      router.push(`/board/${boardID}`);
    } else {
      const newBoardElement = document.getElementById(
        "new_board_modal"
      ) as HTMLDialogElement;
      if (newBoardElement) {
        newBoardElement.showModal();
      } else {
        console.error("Element with ID 'new_board_modal' not found");
      }
    }
  };
  return (
    <>
      <span className="cursor-pointer" onClick={handleClick}>
        <div className="card card-bordered border-primary-content bg-base-120 w-64 h-64 hover:shadow-xl transition-all duration-300 hover:bg-primary-content active:translate-y-1">
          <div className="card-body items-center justify-center">
            {children}
          </div>
        </div>
      </span>
      {boardID === -1 && (
        <dialog id="new_board_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form action="" method="post">
              <h3 className="font-bold text-lg mb-4">Create New Board</h3>
              <input
                type="text"
                name="title"
                id="new_board_title"
                placeholder="Please enter board name"
                className="input input-bordered w-full my-2"
                required
              />
              <button type="submit" className="btn btn-primary w-full my-2">Create</button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default BoardCard;
