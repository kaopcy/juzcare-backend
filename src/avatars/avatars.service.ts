import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAvatarArgs } from './dto/args/get-avatar.args';
import { CreateAvatarInput } from './dto/inputs/create-avatar.input';
import { Avatar, AvatarDocument } from './models/avatar';

@Injectable()
export class AvatarsService {
    constructor(
        @InjectModel(Avatar.name) private readonly avatarModel: Model<AvatarDocument>,
    ) { }

    async createAvatar(createAvatarData: CreateAvatarInput): Promise<Avatar> {
        return this.avatarModel.create(createAvatarData)
    }

    async getAvatar(getAvatarArgs: GetAvatarArgs): Promise<Avatar> {
        return this.avatarModel.findById(getAvatarArgs._id)
    }

    async randomAvatar(): Promise<Avatar> {
        const avatars = await this.avatarModel.find({})
        return avatars[Math.floor(Math.random() * avatars.length)]
    }

    async getAllAvatars(): Promise<Avatar[]> {
        return this.avatarModel.find({})
    }
}
