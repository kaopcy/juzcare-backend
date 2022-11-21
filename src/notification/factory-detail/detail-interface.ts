import { CreateDetailInput } from "./inputs/create-detail.input";

export interface IDetail {
    createDetail(detailData :CreateDetailInput): string
}