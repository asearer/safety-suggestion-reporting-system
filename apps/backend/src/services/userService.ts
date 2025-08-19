// backend/src/services/userService.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

export class UserService {
  async registerUser(data: RegisterDTO) {
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
    const { password, ...safeUser } = user as any;
    return safeUser;
  }

  async loginUser(data: LoginDTO) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await bcrypt.compare(data.password, (user as any).password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { id: (user as any).id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    return token;
  }

  async getUserProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUserProfile(userId: number, data: Partial<RegisterDTO>) {
    const updateData: any = { ...data };
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
