"use client";

import React from "react";
import { Card } from "@/components/common";
import { useRouter } from "next/navigation";

interface BoardCardProps {
  id: string;
  title: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  return (
    <Card variant="board" onClick={handleClick}>
      <h3 className="text-lg font-semibold mb-2 sm:text-base md:text-lg truncate">
        {title}
      </h3>
      <div className="text-sm text-gray-500 hidden sm:block">
        Click to open board
      </div>
    </Card>
  );
};

export default BoardCard;
