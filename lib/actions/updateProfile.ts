"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users } from "@kinde/management-api-js";

export async function updateProfile(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!username || !firstName || !lastName) {
    throw new Error("Username and name are required");
  }

  try {
    await Users.updateUser({
      id: user.id,
      requestBody: {
        given_name: firstName,
        family_name: lastName,
      },
    });

    // Here you would typically update the user's information in your database
    // For example:
    // await db.user.update({
    //   where: { id: user.id },
    //   data: { username, name },
    // });

    return { message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update profile");
  }
}
