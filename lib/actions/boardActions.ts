"use server";

import { revalidatePath } from "next/cache";

export async function addMemberToBoard(boardId: string, email: string) {
  // TODO: Implement the logic to add a member to the board
  // This might involve creating a new user if they don't exist,
  // and then adding them to the board's member list
  console.log(`Adding member ${email} to board ${boardId}`);

  // Revalidate the board page to reflect the changes
  revalidatePath(`/board/${boardId}`);
}

export async function removeMemberFromBoard(boardId: string, memberId: number) {
  // TODO: Implement the logic to remove a member from the board
  console.log(`Removing member ${memberId} from board ${boardId}`);

  // Revalidate the board page to reflect the changes
  revalidatePath(`/board/${boardId}`);
}
