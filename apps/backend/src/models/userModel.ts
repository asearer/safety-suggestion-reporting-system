import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Hashes a plain text password.
 * @param password - The plain text password to hash.
 * @returns A hashed password string.
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifies if a plain text password matches a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Creates a new user in the database.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param password - The plain text password of the user.
 * @returns The created user object.
 */
export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}

/**
 * Finds a user by their email.
 * @param email - The email of the user to find.
 * @returns The user object if found, null otherwise.
 */
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's profile.
 * @param userId - The ID of the user to update.
 * @param data - An object containing the fields to update.
 * @returns The updated user object.
 */
export async function updateUserProfile(
  userId: number,
  data: { name?: string; email?: string; password?: string },
) {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
}

/**
 * Deletes a user by their ID.
 * @param userId - The ID of the user to delete.
 * @returns The deleted user object.
 */
export async function deleteUser(userId: number) {
  return await prisma.user.delete({
    where: { id: userId },
  });
}
