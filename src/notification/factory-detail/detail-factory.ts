import { Report } from "src/reports/models/report";
import { User } from "src/users/models/user";
import { NotifyTypeEnum } from "../dto/enum/notify.enum";
import { CommentDetail } from "./concrete-details/comment-detail";
import { CompleteDetail } from "./concrete-details/complete-detail";
import { InProcessDetail } from "./concrete-details/inprocess-detail";
import { TrendDetail } from "./concrete-details/trend-detail";
import { UpVoteDetail } from "./concrete-details/upvote-detail";
import { VerifiedDetail } from "./concrete-details/verified-detail";
import { IDetail } from "./detail-interface";
import { CreateDetailInput } from "./inputs/create-detail.input";

export class DetailFactory {
    // static generateNotificationObject(createNotificationData: CreateNotificationInput) {
    //     const { user, report, type } = createNotificationData
    //     return {
    //         userId: user._id.toString(),
    //         reportId: report._id.toString(),
    //         detail: this.detail(user, report, type),
    //         type: type,
    //     }
    // }
    static createDetail(user: User, report: Report, type: NotifyTypeEnum): string {
        return this.checkDetailType(type).createDetail(new CreateDetailInput(report, user))
    }

    private static checkDetailType(type: NotifyTypeEnum): IDetail {
        if (type === NotifyTypeEnum.upVote) {
            return new UpVoteDetail()
        } else if (type === NotifyTypeEnum.comment) {
            return new CommentDetail()
        } else if (type === NotifyTypeEnum.trend) {
            return new TrendDetail()
        } else if (type === NotifyTypeEnum.verified) {
            return new VerifiedDetail()
        } else if (type === NotifyTypeEnum.inProgress) {
            return new InProcessDetail()
        } else {
            return new CompleteDetail()
        }
    }
}