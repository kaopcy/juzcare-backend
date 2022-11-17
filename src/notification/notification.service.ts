import { Injectable } from '@nestjs/common';
import { Notification } from './models/notifications';

@Injectable()
export class NotificationService {
    private notifications: Notification[] = [];

    public updateNotification(): Notification {

    }
    public getNotification(): Notification {
        
    }
}
