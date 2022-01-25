export class OpenedAppDto{
    public companyId: number;
    public companyName: string;
    public openedApps: OpenedAppBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class OpenedAppBaseDto{
    public companyId: number;
    public companyName: string;
    public userName: string;
    public date: Date;
}