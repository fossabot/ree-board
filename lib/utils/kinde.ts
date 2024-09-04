import { Users, init } from "@kinde/management-api-js";

/**
 * Fetch a Kinde user by their ID.
 * @param kindeID - The ID of the Kinde user
 * @returns The Kinde user object
 *
 * Note: This function assumes you have the `@kinde/management-api-js` package installed
 * and properly configured with your Kinde management API credentials.
 **/
export const getKindeUser = async (kindeID: string) => {
  try {
    init(); // Initialize the Kinde management API client
    const user = await Users.getUserData({ id: kindeID });
    return user;
  } catch (error) {
    console.error("Failed to fetch Kinde user:", error);
    return null;
  }
};
