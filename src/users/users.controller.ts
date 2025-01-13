import { Controller, Get, Put, Delete, Param, Body, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from 'express';
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Users } from '@prisma/client';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users', description: 'Retrieves all users from the system. Requires authentication.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'Ok!' },
        message: { type: 'string', example: 'Successfully fetched data!' },
        result: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              username: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by ID', description: 'Updates a user by their ID. Requires authentication.' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the user',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'Ok!' },
        message: { type: 'string', example: 'User updated successfully!' },
        result: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<Users>,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.updateUserById(id, body);
      return response.status(200).json({
        status: 'Ok!',
        message: 'User updated successfully!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by ID', description: 'Deletes a user by their ID. Requires authentication.' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteUser(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    try {
      await this.userService.deleteUserById(id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'User deleted successfully!',
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
