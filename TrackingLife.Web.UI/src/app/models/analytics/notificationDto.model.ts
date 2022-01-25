export class NotificationDto{
    public companyId: number;
    public companyName: string;
    public notifications: NotificationBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class NotificationBaseDto{
    public companyId: number;
    public companyName: string;
    public platform: string;
    public date: Date;
}