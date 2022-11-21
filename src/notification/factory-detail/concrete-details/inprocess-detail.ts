import { IDetail } from "../detail-interface";
import { CreateDetailInput } from "../inputs/create-detail.input";

export class InProcessDetail implements IDetail {
    createDetail(detailData: CreateDetailInput): string {
        return `รายงาน "${detailData.getTitleReport()}" ของคุณกำลังดำเนินการ `
    }

}