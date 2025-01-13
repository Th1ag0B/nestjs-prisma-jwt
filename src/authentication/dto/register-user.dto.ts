import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUsersDto {
  @ApiProperty({
    example: 'Tiago',
    description: 'The username for registration'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password123!',
    description: 'The password for registration'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Tiago Barros',
    description: 'The full name of the user'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'barros.tiago@example.com',
    description: 'The email address for registration'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
