"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PostType } from "@/db/schema";
import {
  HandThumbUpIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAnonymousMode } from "./AnonymousModeProvider";

interface PostCardProps {
  type: PostType;
  initialContent: string;
  id: string;
  viewOnly?: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, newContent: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  type,
  initialContent,
  id,
  viewOnly = false,
  onDelete,
  onUpdate,
}) => {
  const [message, setMessage] = useState(initialContent);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { isAnonymous } = useAnonymousMode();

  const cardTypes = {
    [PostType.went_well]: "bg-green-100",
    [PostType.to_improvement]: "bg-red-100",
    [PostType.to_discuss]: "bg-yellow-100",
    [PostType.action_item]: "bg-purple-100",
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleVote = () => {
    if (viewOnly) return;
    if (hasVoted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setHasVoted(!hasVoted);
  };

  const handleEdit = () => {
    if (onUpdate) {
      onUpdate(id, message);
    }
    setIsEditing(false);
  };

  return (
    <Card className={`w-full ${cardTypes[type]} relative`}>
      {!viewOnly && onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onDelete(id)}
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      )}
      <CardContent className="pt-8">
        <p
          className={`whitespace-pre-wrap text-balance break-words ${
            isAnonymous ? "blur-sm select-none" : ""
          }`}
        >
          {message}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end items-center">
        <div className="flex items-center space-x-2">
          {!viewOnly && (
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PencilSquareIcon className="h-4 w-4" />
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
            } ${viewOnly ? "cursor-default" : ""}`}
            onClick={handleVote}
          >
            <HandThumbUpIcon className="h-4 w-4 mr-2" />
            <span>{voteCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
