import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './models/tag';
import { Admin, AdminSchema } from 'src/admins/models/admin';
import { AdminsService } from 'src/admins/admins.service';

@Module({
  imports:
    [
      MongooseModule.forFeature([
        { name: Tag.name, schema: TagSchema },
        { name: Admin.name, schema: AdminSchema },
      ]),
    ],
  providers: [TagsService, TagsResolver, AdminsService,]
})
export class TagsModule { }
