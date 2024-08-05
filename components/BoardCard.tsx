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
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      )}
    </>
  );
};

export default BoardCard;
