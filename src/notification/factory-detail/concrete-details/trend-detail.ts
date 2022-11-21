import { IDetail } from "../detail-interface";
import { CreateDetailInput } from "../inputs/create-detail.input";

export class TrendDetail implements IDetail {
    createDetail(detailData: CreateDetailInput): string {
        return `รายงาน "${detailData.getTitleReport()}" ของคุณมีผู้สนใจเป็นจำนวนมาก `
    }
    
}