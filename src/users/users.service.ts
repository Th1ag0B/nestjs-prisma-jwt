import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";


@Injectable()
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    return this.prisma.users.create({
      data,
    });
  }

  async updateUserById(id: string, data: Partial<Users>): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUserById(id: string): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    await this.prisma.users.delete({
      where: { id },
    });
  }
}
