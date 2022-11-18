import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user';
import { JwtService } from '@nestjs/jwt';
import { AvatarsService } from 'src/avatars/avatars.service';
import { Avatar, AvatarSchema } from 'src/avatars/models/avatar';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
  ],
  providers: [UsersService, UsersResolver, JwtService, AvatarsService]
})
export class UsersModule {}
