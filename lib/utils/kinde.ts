"use server";

import { Users } from "@kinde/management-api-js";

/**
 * Fetch a Kinde user by their ID.
 * @param kindeId - The ID of the Kinde user
 * @returns The Kinde user object
 *
 * Note: This function assumes you have the `@kinde/management-api-js` package installed
 * and properly configured with your Kinde management API credentials.
 **/
export const getKindeUser = async (kindeId: string) => {
  const { users } = await Users.getUsers({ userId: kindeId });
  if (users && users.length > 0) {
    return users[0];
  }
  console.error(`User with ID ${kindeId} not found.`);
  return null;
};
