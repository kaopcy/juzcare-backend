import { IDetail } from "../detail-interface";
import { CreateDetailInput } from "../inputs/create-detail.input";

export class CompleteDetail implements IDetail {
    createDetail(detailData: CreateDetailInput): string {
        return `รายงาน "${detailData.getTitleReport()}" ของคุณเสร็จสิ้น `
    }

}