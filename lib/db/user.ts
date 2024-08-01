import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

import { userTable } from "@/db/schema";
import { db } from "./client";

export async function findUserIdByKindeId(kindeId: string) {
  const result = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.kinde_id, kindeId));
  if (result.length > 0) {
    return result[0].id;
  } else {
    throw new Error(`User with Kinde ID "${kindeId}" not found`);
  }
}

export async function createUser(user: typeof userTable.$inferInsert) {
  const userID = uuid();
  await db.insert(userTable).values({
    id: userID,
    kinde_id: user.kinde_id,
    name: user.name,
    email: user.email,
  });
}
