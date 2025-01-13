import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from 'express';
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

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
                                   id: { type: 'number' },
                                   username: { type: 'string' }
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
}