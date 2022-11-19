import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsResolver } from './avatars.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './models/avatar';

@Module({
  imports:
  [
    MongooseModule.forFeature([
      { name: Avatar.name, schema: AvatarSchema },
      // { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AvatarsService, AvatarsResolver]
})
export class AvatarsModule {}
