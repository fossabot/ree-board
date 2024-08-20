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
        <div className="card card-bordered border-primary-content bg-base-120 w-64 h-32 hover:shadow-xl transition-all duration-300 hover:bg-primary-content active:translate-y-1">
          <div className="card-body items-center justify-center">
            {children}
          </div>
        </div>
      </span>
    </>
  );
};

export default BoardCard;
