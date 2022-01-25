import { NumberValueAccessor } from '@angular/forms';

export class UserVisitingDto{
    public companyId: number;
    public companyName: string;
    public users: UserVisitinBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class UserVisitinBaseDto{
    public companyId: number;
    public companyName: string;
    public userName: string;
    public date: Date;
}