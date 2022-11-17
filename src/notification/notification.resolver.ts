import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetNotificationArgs } from './dto/get-notification.args';
import { Notification } from './models/notifications';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) {}

    @Query(() => Notification, { name: 'user' ,nullable: true})
    getNotification(@Args() getNotificationArgs: GetNotificationArgs): Notification {
        return this.notificationService.getNotification();
    }
}
