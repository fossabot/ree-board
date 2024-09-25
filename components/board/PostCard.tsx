"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PostType } from "@/db/schema";
import {
  HandThumbUpIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React, { useState } from "react";
// import { useAnonymousMode } from "./AnonymousModeProvider";

interface PostCardProps {
  type: PostType;
  initialContent: string;
  id: string;
  viewOnly?: boolean;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  type,
  initialContent,
  id,
  viewOnly,
  onDelete,
}) => {
  const [message, setMessage] = useState(initialContent);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const isAnonymous = useAnonymousMode();

  const cardTypes = {
    [PostType.went_well]: "bg-green-100",
    [PostType.to_improvement]: "bg-red-100",
    [PostType.to_discuss]: "bg-yellow-100",
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

  const handleEdit = () => {
    setIsEditing(false);
  };

  return (
    <Card className={`w-full ${cardTypes[type]} relative`}>
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
        <p className="whitespace-pre-wrap">{message}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-gray-500 capitalize">{type}</p>
        <div className="flex items-center space-x-2">
          {!viewOnly && (
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PencilSquareIcon className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Message</DialogTitle>
                </DialogHeader>
                <Textarea
                  value={message}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
                <Button onClick={handleEdit}>Save</Button>
              </DialogContent>
            </Dialog>
          )}
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
