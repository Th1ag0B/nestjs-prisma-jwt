import { 
     Controller, 
     Get, 
     Put, 
     Delete, 
     Post, 
     Param, 
     Body, 
     Req, 
     Res, 
     UseGuards, 
     ConflictException, 
     NotFoundException 
 } from "@nestjs/common";
 import { UsersService } from "./users.service";
 import { Request, Response } from 'express';
 import { JwtAuthGuard } from "src/authentication/auth.guard";
 import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
 import { CreateUserDto } from './dto/create-user.dto';
 import { UpdateUserDto } from './dto/update-user.dto';
 
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
                 message: { type: 'string', example: 'Successfully fetch data!' },
                 result: { 
                     type: 'array',
                     items: { 
                         type: 'object',
                         properties: {
                             id: { type: 'string', format: 'uuid' },
                             username: { type: 'string' },
                             email: { type: 'string' },
                             name: { type: 'string' }
                         }
                     }
                 }
             }
         }
     })
     @ApiResponse({ status: 500, description: 'Internal server error' })
     async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
         try {
             const result = await this.userService.getAllUser();
             return response.status(200).json({
                 status: 'Ok!',
                 message: 'Successfully fetch data!',
                 result: result
             });
         } catch(err) {
             return response.status(500).json({
                 status: 'Error!',
                 message: 'Internal Server Error!'
             });
         }
     }
 
     @Post('add')
     @UseGuards(JwtAuthGuard)
     @ApiOperation({ summary: 'Create user', description: 'Creates a new user. Requires authentication.' })
     @ApiResponse({ 
         status: 201, 
         description: 'Successfully created user',
         schema: {
             type: 'object',
             properties: {
                 status: { type: 'string', example: 'Ok!' },
                 message: { type: 'string', example: 'Successfully created user!' },
                 result: { 
                     type: 'object',
                     properties: {
                         id: { type: 'string', format: 'uuid' },
                         username: { type: 'string' },
                         email: { type: 'string' },
                         name: { type: 'string' }
                     }
                 }
             }
         }
     })
     @ApiResponse({ status: 409, description: 'Username or email already exists' })
     @ApiResponse({ status: 500, description: 'Internal server error' })
     async addUser(
         @Body() createUserDto: CreateUserDto,
         @Res() response: Response
     ): Promise<any> {
         try {
             const result = await this.userService.createUser(createUserDto);
             return response.status(201).json({
                 status: 'Ok!',
                 message: 'Successfully created user!',
                 result: result
             });
         } catch(err) {
             if (err instanceof ConflictException) {
                 return response.status(409).json({
                     status: 'Error!',
                     message: err.message
                 });
             }
             return response.status(500).json({
                 status: 'Error!',
                 message: 'Internal Server Error!'
             });
         }
     }
 
     @Put(':id')
     @UseGuards(JwtAuthGuard)
     @ApiOperation({ summary: 'Update user', description: 'Updates a user by ID. Requires authentication.' })
     @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'User ID' })
     @ApiResponse({ 
         status: 200, 
         description: 'Successfully updated user',
         schema: {
             type: 'object',
             properties: {
                 status: { type: 'string', example: 'Ok!' },
                 message: { type: 'string', example: 'Successfully updated user!' },
                 result: { 
                     type: 'object',
                     properties: {
                         id: { type: 'string', format: 'uuid' },
                         username: { type: 'string' },
                         email: { type: 'string' },
                         name: { type: 'string' }
                     }
                 }
             }
         }
     })
     @ApiResponse({ status: 404, description: 'User not found' })
     @ApiResponse({ status: 409, description: 'Username or email already exists' })
     @ApiResponse({ status: 500, description: 'Internal server error' })
     async updateUser(
         @Param('id') id: string,
         @Body() updateUserDto: UpdateUserDto,
         @Res() response: Response
     ): Promise<any> {
         try {
             const result = await this.userService.updateUser(id, updateUserDto);
             return response.status(200).json({
                 status: 'Ok!',
                 message: 'Successfully updated user!',
                 result: result
             });
         } catch(err) {
             if (err instanceof NotFoundException) {
                 return response.status(404).json({
                     status: 'Error!',
                     message: err.message
                 });
             }
             if (err instanceof ConflictException) {
                 return response.status(409).json({
                     status: 'Error!',
                     message: err.message
                 });
             }
             return response.status(500).json({
                 status: 'Error!',
                 message: 'Internal Server Error!'
             });
         }
     } 
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete user', description: 'Deletes a user by ID. Requires authentication.' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'User ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Successfully deleted user',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'Ok!' },
                message: { type: 'string', example: 'Successfully deleted user!' },
                result: { 
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        name: { type: 'string' }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async deleteUser(
        @Param('id') id: string,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.userService.deleteUser(id);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully deleted user!',
                result: result
            });
        } catch(err) {
            if (err instanceof NotFoundException) {
                return response.status(404).json({
                    status: 'Error!',
                    message: err.message
                });
            }
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!'
            });
        }
    }
}