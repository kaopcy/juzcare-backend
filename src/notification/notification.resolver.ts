import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
// import { GetNotificationArgs } from './dto/args/get-notification.args';
import { Notification } from './models/notifications';
import { NotificationService } from './notification.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UpdateNotificationInput } from './dto/inputs/update-notification.input';
import { User } from 'src/users/models/user';
import { CurrentUser } from 'src/auth/current-user.args';
// import { CreateNotificationInput } from './dto/inputs/create-notification.input';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
  ) { }

  //   @Mutation(() => Notification, { nullable: true })
  //   @UseGuards(GqlAuthGuard)
  //   public async createNotification(
  //     @Args('createNotificationData')
  //     createNotificationData: CreateNotificationInput,
  //   ): Promise<Notification> {
  //     return this.notificationService.createNotification(createNotificationData);
  //   }

  @Mutation(() => Notification, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async updateNotification(
    @Args('updateNotificationData')
    updateNotificationData: UpdateNotificationInput,
  ): Promise<Notification> {
    return this.notificationService.updateNotification(updateNotificationData);
  }

  // @Query(() => Notification, { nullable: true })
  // @UseGuards(GqlAuthGuard)
  // public async getNotification(
  //   @Args() getNotificationArgs: GetNotificationArgs,
  // ): Promise<Notification> {
  //   const noti = await this.notificationService.getNotification(getNotificationArgs);
  //   await this.notificationService.updateNotification({ _id: getNotificationArgs._id })
  //   return noti
  // }

  @Query(() => [Notification], { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async getNotifications(@CurrentUser() user: User): Promise<Notification[]> {
    const noti = await this.notificationService.getNotificationByUserId({ userId: user._id.toString() });
    return noti
  }
}
