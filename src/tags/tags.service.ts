import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetTagsArgs } from './dto/args/get-tags.args';
import { CreateTagInput } from './dto/inputs/create-tag.input';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { VerifyEnum } from './enum/verify.enum';
import { Tag, TagDocument } from './models/tag';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    ) { }

    async createTag(createTagData: CreateTagInput): Promise<Tag> {
        const duplicate_tag = await this.getTagByName(createTagData.name);
        if (!duplicate_tag) {
            return await this.tagModel.create({ name: createTagData.name });
        } else {
            return duplicate_tag;
        }
    }

    async getAllTags(): Promise<Tag[]> {
        return await this.tagModel.find({})
    }

    async getTags(getTagsArgs: GetTagsArgs): Promise<Tag[]> {
        if (!getTagsArgs._ids.length) {
            return []
        }
        return await this.tagModel.find({ _id: { $in: getTagsArgs._ids } })
    }

    async getVeifiedTags(): Promise<Tag[]> {
        return this.tagModel.find({ status: VerifyEnum.verified })
    }

    async updateStatus(updateTagData: UpdateTagInput): Promise<Tag> {
        const updated_tag = await this.tagModel.findByIdAndUpdate(updateTagData._id, { status: updateTagData.status }, { new: true })
        return updated_tag ? updated_tag : null
    }

    async getTagByName(name: string): Promise<Tag> {
        const tag = await this.tagModel.find({ name: name })
        if (!tag.length) {
            return null
        }
        return this.tagModel.findOne({ name: name })
    }

    async findById(_id: string): Promise<Tag> {
        const tag = await this.tagModel.findById(_id)
        if (! tag) {
            throw new NotFoundException('ไม่สามารถหาแท็กนั้นได้')
        }
        return tag
    }
}
