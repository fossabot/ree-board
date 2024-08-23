"use client";

import React from "react";
import { Card } from "@/components/common";

interface PostCardProps {
  content: string;
  onEdit?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ content, onEdit }) => {
  return (
    <Card variant="post" draggable={true}>
      <p className="text-sm mb-2 line-clamp-3">{content}</p>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-xs text-blue-600 hover:text-blue-800 self-end mt-auto"
        >
          Edit
        </button>
      )}
    </Card>
  );
};

export default PostCard;
