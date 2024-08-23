import React from "react";
import BoardSection from "@/components/BoardSection";
import { PostType } from "@/db/schema";

interface BoardGridProps {
  boardID: string;
}

const BoardGrid: React.FC<BoardGridProps> = ({ boardID }) =>  {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
        <BoardSection title="Went Well" postType={PostType.went_well} boardID={boardID} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
        <BoardSection title="To Improve" postType={PostType.to_improvement} boardID={boardID} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
        <BoardSection title="To Discuss" postType={PostType.to_discuss} boardID={boardID} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
        <BoardSection title="Action Items" postType={PostType.action_item} boardID={boardID} />
      </div>
    </div>
  );
}

export default BoardGrid;
