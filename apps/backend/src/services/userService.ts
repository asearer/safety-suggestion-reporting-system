// backend/src/services/userService.ts
import { PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

type UserProfile = Pick<User, "id" | "name" | "email" | "createdAt" | "updatedAt">;

/**
 * Service for handling user-related operations such as registration, login, and profile management.
 */
export class UserService {
  /**
   * Registers a new user.
   * @param data - The registration data.
   * @returns The created user profile without the password.
   * @throws Error if the email is already in use.
   */
  async registerUser(data: RegisterDTO): Promise<Omit<User, "password">> {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already in use");
    }
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
      },
    });
    // Exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Authenticates a user.
   * @param data - The login credentials.
   * @returns A JWT token if authentication is successful.
   * @throws Error if credentials are invalid.
   */
  async loginUser(data: LoginDTO): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    return token;
  }

  /**
   * Retrieves a user's profile by ID.
   * @param userId - The ID of the user.
   * @returns The user's profile.
   * @throws Error if the user is not found.
   */
  async getUserProfile(userId: number): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  /**
   * Updates a user's profile.
   * @param userId - The ID of the user to update.
   * @param data - The data to update.
   * @returns The updated user profile.
   */
  async updateUserProfile(userId: number, data: Partial<RegisterDTO>): Promise<UserProfile> {
    const updateData: Partial<User> = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    return updated;
  }
}
