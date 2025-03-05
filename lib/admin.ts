// lib/admin.ts
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Sets the admin role for a specific user
 */
export async function setUserAsAdmin(userId: string): Promise<void> {
  try {
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Error setting user as admin:", error);
    throw new Error("Failed to set user as admin");
  }
}
