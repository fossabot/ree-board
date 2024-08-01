import React from "react";

interface BoardCardProps {
  title: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ title }) => {
  return (
    <div className="card bg-base-120 w-64 h-64 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title text-center text-neutral">{title}</h2>
      </div>
    </div>
  );
};

export default BoardCard;
