import { Module } from '@nestjs/common';
import { ProgressesService } from './progresses.service';
import { ProgressesResolver } from './progresses.resolver';
import { UsersService } from 'src/users/users.service';
import { Progress, ProgressSchema } from './models/progress';
import { User, UserSchema } from 'src/users/models/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:
  [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ProgressesService, ProgressesResolver, UsersService]
})
export class ProgressesModule {}
