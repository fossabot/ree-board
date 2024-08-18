// postSignals.ts
import { signal } from "@preact/signals-react";
import { PostType } from "@/db/schema";

export interface Post {
  id: number;
  content: string;
  type: PostType;
}

export const postsSignal = signal<Post[]>([]);

export const addPost = (newPost: Post) => {
  postsSignal.value = [...postsSignal.value, newPost];
};

export const removePost = (postId: number) => {
  postsSignal.value = postsSignal.value.filter((post) => post.id !== postId);
};
