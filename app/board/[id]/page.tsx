import BoardSection from "@/components/BoardSection";
import NavBar from "@/components/NavBar";
import { boardTable, postTable, PostType } from "@/db/schema";
import { db } from "@/lib/db/client";
import { fetchPostsByBoardID } from "@/lib/db/post";
import { postSignal } from "@/lib/signal/postSignals";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import React from "react";

const fetchInitialPosts = async (boardId: string) => {
  const posts = await fetchPostsByBoardID(+boardId);
  postSignal.value = posts;
};

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const boardID = params.id;

  fetchInitialPosts(boardID);

  return (
    <>
      <NavBar />
      <div className="container mx-auto w-full max-w-full px-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <BoardSection title="Went Well" postType={PostType.went_well} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <BoardSection title="To Improve" postType={PostType.to_improvement} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <BoardSection title="To Discuss" postType={PostType.to_discuss} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <BoardSection title="Action Items" postType={PostType.action_item} />
          </div>
        </div>
      </div>
    </>
  );
}
