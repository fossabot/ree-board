import { LoadingSpinner } from "@/components/ui";
import { PostType } from "@/db/schema";
import dynamic from "next/dynamic";
import React from "react";

const BoardColumn = dynamic(() => import("@/components/board/BoardColumn"), {
  loading: () => <LoadingSpinner />,
});

interface BoardGridProps {
  boardID: string;
  viewOnly?: boolean;
}

const BoardGrid: React.FC<BoardGridProps> = async ({ boardID, viewOnly }) => {
  const columns = [
    { title: "Went Well", postType: PostType.went_well },
    { title: "To Improve", postType: PostType.to_improvement },
    { title: "To Discuss", postType: PostType.to_discuss },
    { title: "Action Items", postType: PostType.action_item },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {columns.map((column) => (
        <BoardColumn
          key={column.title}
          title={column.title}
          postType={column.postType}
          boardID={boardID}
          viewOnly={viewOnly}
        />
      ))}
    </div>
  );
};

export default BoardGrid;
