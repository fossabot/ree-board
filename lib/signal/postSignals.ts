import { signal } from "@preact/signals-react";
import type { Post } from "@/db/schema";

export const postSignal = signal<Post[]>([]);

export const postSignalInitial = (posts: Post[]) => {
  postSignal.value = posts;
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

export const updatePost = (updatedPost: Post) => {
  const index = postSignal.value.findIndex((post) => post.id === updatedPost.id);
  if (index!== -1) {
    postSignal.value = [
     ...postSignal.value.slice(0, index),
      updatedPost,
     ...postSignal.value.slice(index + 1),
    ];
  }
}
