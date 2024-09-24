"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PostType } from "@/db/schema";
import { XMarkIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
// import { useAnonymousMode } from "./AnonymousModeProvider";

interface PostCardProps {
  type: PostType;
  initialContent: string;
  id: string;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  type,
  initialContent,
  id,
  onDelete,
}) => {
  const [message, setMessage] = useState(initialContent);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  // const isAnonymous = useAnonymousMode();

  const cardTypes = {
    [PostType.went_well]: "bg-green-100",
    [PostType.to_improvement]: "bg-yellow-100",
    [PostType.to_discuss]: "bg-blue-100",
    [PostType.action_item]: "bg-purple-100",
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setHasVoted(!hasVoted);
  };

  return (
    <Card
      className={`w-full max-w-md ${cardTypes[type]} relative`}
      draggable={true}
    >
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onDelete(id)}
        >
          <XMarkIcon className="size-4" />
        </Button>
      )}
      <CardContent className="pt-8">
        <Input
          value={message}
          onChange={handleChange}
          // className={`bg-transparent border-none ${
          //   isAnonymous ? "blur-sm" : ""
          // }`}
          className="bg-transparent border-none"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            hasVoted ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={handleVote}
        >
          <HandThumbUpIcon className="size-4 mr-2" />
          <span>{voteCount}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
