import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUser(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    async createUser(data: CreateUserDto): Promise<Users> {
        await this.validateUniqueFields(data.username, data.email);

        return this.prisma.users.create({
            data,
        });
    }

    async updateUser(id: string, data: UpdateUserDto): Promise<Users> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (data.username || data.email) {
            await this.validateUniqueFields(data.username, data.email, id);
        }

        return this.prisma.users.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: string): Promise<Users> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.users.delete({
            where: { id },
        });
    }

    private async validateUniqueFields(username?: string, email?: string, excludeId?: string): Promise<void> {
        if (username) {
            const existingUsername = await this.prisma.users.findFirst({
                where: {
                    username,
                    id: excludeId ? { not: excludeId } : undefined,
                },
            });
            if (existingUsername) {
                throw new ConflictException('Username already exists');
            }
        }

        if (email) {
            const existingEmail = await this.prisma.users.findFirst({
                where: {
                    email,
                    id: excludeId ? { not: excludeId } : undefined,
                },
            });
            if (existingEmail) {
                throw new ConflictException('Email already exists');
            }
        }
    }
}
