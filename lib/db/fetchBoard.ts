import { boardTable, userTable } from "@/db/schema";
import { db } from "./client";

export async function fetchBoards(userId: string, useKindeId: boolean = true) {
  if (userId === null) {
    throw new Error("User ID is required");
  }
  if (useKindeId) {
    return db.select({});
  }
}
