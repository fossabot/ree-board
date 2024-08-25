import { signal } from "@preact/signals-react";
import { PostType } from "@/db/schema";
import { fetchPostsByBoardID } from "@/lib/db/post";

export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  author: string | null;
  updatedAt: Date;
  boardId: string;
  type: PostType;
}

export const postSignal = signal<Post[]>([]);

export const postSignalInitial = async (boardId: string) => {
  postSignal.value = await fetchPostsByBoardID(boardId);
};

export const addPost = (newPost: Post) => {
  postSignal.value = [...postSignal.value, newPost];
};

export const removePost = (postID: string) => {
  const index = postSignal.value.findIndex((post) => post.id === postID);
  if (index !== -1) {
    postSignal.value = [
      ...postSignal.value.slice(0, index),
      ...postSignal.value.slice(index + 1),
    ];
  }
};
