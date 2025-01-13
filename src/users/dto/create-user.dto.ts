
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Tiago Barros', description: 'The name of the user' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'barrostiago', description: 'The username of the user' })
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    username: string;

    @ApiProperty({ example: 'barros.tiago@example.com', description: 'The email of the user' })
    @IsEmail()
    @MaxLength(45)
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password: string;
}
