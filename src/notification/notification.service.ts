import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetNotificationArgs } from './dto/args/get-notification.args';
import { GetNotificationByUserIdArgs } from './dto/args/get-notificationByUserId.args';
import { CreateNotificationInput } from './dto/inputs/create-notification.input';
import { UpdateNotificationInput } from './dto/inputs/update-notification.input';
import { Notification, NotificationDocument } from './models/notifications';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    readonly notificationModel: Model<NotificationDocument>,
  ) { }

  async createNotification(createNotificationData: CreateNotificationInput) {
    // const { isWatch, userId } = createNotificationData
    let _detail: string;
    const { firstName, lastName } = createNotificationData.user;
    const { title } = createNotificationData.report;

    if (createNotificationData.type === 'UPVOTE') {
      _detail = `คุณ ${firstName} ${lastName}: เห็นด้วยกับการรายงาน "${title}" ของคุณ `;
    } else if (createNotificationData.type === 'COMMENT') {
      _detail = `คุณ ${firstName} ${lastName}: แสดงความคิดเห็นในรายงาน "${title}" ของคุณ `;
    } else if (createNotificationData.type === 'TREND') {
      _detail = `รายงาน "${title}" ของคุณมีผู้สนใจเป็นจำนวนมาก `;
    } else if (createNotificationData.type === 'VERIFIED') {
      _detail = `รายงาน "${title}" ของคุณได้รับการอนุมัติ `;
    } else if (createNotificationData.type === 'VERIFIED') {
      _detail = `รายงาน "${title}" ของคุณได้รับการอนุมัติ `;
    } else if (createNotificationData.type === 'INPROCESS') {
      _detail = `รายงาน "${title}" ของคุณกำลังดำเนินการ `;
    } else if (createNotificationData.type === 'COMPLETE') {
      _detail = `รายงาน "${title}" ของคุณเสร็จสิ้น `;
    }
    // console.log(createNotificationData);

    const _noti = {
      userId: createNotificationData.user._id.toString(),
      reportId: createNotificationData.report._id.toString(),
      detail: _detail,
      type: createNotificationData.type,
    };
    await this.notificationModel.create(_noti);
    return;
  }

  async updateNotification(
    updateNotificationData: UpdateNotificationInput,
  ): Promise<Notification> {
    const update_notification = this.notificationModel.findByIdAndUpdate(
      updateNotificationData._id.toString(),
      { isWatched: true },
      { new: true },
    );

    return update_notification;
  }

  async getNotification(
    getNotificationArgs: GetNotificationArgs,
  ): Promise<Notification> {
    const noti = await this.notificationModel
      .findById(getNotificationArgs._id)
      .exec();
    return noti;
  }

  async getNotificationByUserId(
    getNotificationByUserIdArgs: GetNotificationByUserIdArgs,
  ): Promise<Notification[]> {
    const noti = await this.notificationModel
      .find({ userId: getNotificationByUserIdArgs.userId })
      .exec();
    // await this.notificationModel.updateMany(
    //   { userId: getNotificationByUserIdArgs.userId },
    //   { isWatched: true },
    //   { new: true },
    // );
    return noti;
  }
}