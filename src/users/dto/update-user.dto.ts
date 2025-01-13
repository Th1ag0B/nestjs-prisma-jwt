
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'John Doe', description: 'The name of the user' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name?: string;

    @ApiPropertyOptional({ example: 'johndoe', description: 'The username of the user' })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    username?: string;

    @ApiPropertyOptional({ example: 'john@example.com', description: 'The email of the user' })
    @IsOptional()
    @IsEmail()
    @MaxLength(45)
    email?: string;

    @ApiPropertyOptional({ example: 'password123', description: 'The password of the user' })
    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password?: string;
}