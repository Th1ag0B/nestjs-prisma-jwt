import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, 
      isGlobal: true, 
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService], 
})
export class AppModule {}
