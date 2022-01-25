import { Time } from '@angular/common';

export class ViewsNewsDto{
    public companyId: number;
    public companyName: string;
    public viewsNews: ViewsNewsBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class ViewsNewsBaseDto{
    public companyId: number;
    public companyName: string;
    public newsTitle: string;
    public date: Date;
    public userName: string;
    public readingTime: Time;
}