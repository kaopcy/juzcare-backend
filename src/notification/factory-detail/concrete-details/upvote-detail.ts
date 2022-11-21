import { IDetail } from "../detail-interface";
import { CreateDetailInput } from "../inputs/create-detail.input";

export class UpVoteDetail implements IDetail {
    createDetail(detailData: CreateDetailInput): string {
        return `คุณ ${detailData.getFirstNameUser()} ${detailData.getLastNameUser()}: เห็นด้วยกับการรายงาน "${detailData.getTitleReport()}" ของคุณ `
    }
}