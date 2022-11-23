import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { MediasService } from "src/medias/medias.service";
import { TagsService } from "src/tags/tags.service";
import { CreateReportInput } from "../dto/inputs/create-report.input";

@Injectable()
export class CreateReportFacade {
    constructor(
        private readonly mediasSubsystem: MediasService,
        private readonly tagsSubsystem: TagsService
    ){ }

    async operation(reportData: CreateReportInput): Promise<CreateReportInput> {
        const _medias = [];
        if (reportData.medias?.length) {
            for (const m of reportData.medias) {
                const media = await this.mediasSubsystem.createMedia(m);
                _medias.push(media._id);
            }
        }
        reportData.medias = _medias;

        const _tags = [];

        if (reportData.tags.length) {
            for (const tag of reportData.tags) {
                if (!mongoose.Types.ObjectId.isValid(tag)) {
                    const _tag = await this.tagsSubsystem.createTag({ name: tag })
                    _tags.push(_tag._id.toString());
                } else {
                    _tags.push(tag);
                }
            }
            reportData.tags = _tags;
        }
        return reportData
    }
}