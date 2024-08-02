import React, { ReactNode, MouseEvent } from "react";

interface BoardCardProps {
  children: ReactNode;
  onClickAction: (event: MouseEvent<HTMLSpanElement>) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ children, onClickAction }) => {
  return (
    <span className="cursor-pointer">
      <div
        className="card card-bordered border-primary-content bg-base-120 w-64 h-64 hover:shadow-xl transition-all duration-300 hover:bg-primary-content active:translate-y-1"
        onClick={onClickAction}
      >
        <div className="card-body flex items-center justify-center">
          {children}
        </div>
      </div>
    </span>
  );
};

export default BoardCard;
