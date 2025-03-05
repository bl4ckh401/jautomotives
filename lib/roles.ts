// utils/roles.ts
import { auth } from "@clerk/nextjs/server";

interface UserMetadata {
  role?: string;
}

export const checkRole = async (role: 'admin') => {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as UserMetadata)?.role === role;
};