import { LoadingSpinner } from "@/components/ui";
import { PostType } from "@/db/schema";
import React, { lazy, Suspense } from "react";

const BoardColumn = lazy(() => import("@/components/board/BoardColumn"));

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
    <div className="flex flex-wrap -mx-2">
      {columns.map((column) => (
        <div key={column.title} className="h-full w-full ~w-[1/2]/[1/4] px-1 mb-4">
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <BoardColumn
              title={column.title}
              postType={column.postType}
              boardID={boardID}
              viewOnly={viewOnly}
            />
          </Suspense>
        </div>
      ))}
    </div>
  );
};

export default BoardGrid;
