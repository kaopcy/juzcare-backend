import { IDetail } from "../detail-interface";
import { CreateDetailInput } from "../inputs/create-detail.input";

export class CommentDetail implements IDetail {
    createDetail(detailData: CreateDetailInput): string {
        return `คุณ ${detailData.getFirstNameUser()} ${detailData.getLastNameUser()}: แสดงความคิดเห็นในรายงาน "${detailData.getTitleReport()}" ของคุณ`
    }

}