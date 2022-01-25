export class PopularNewsDto{
    public companyId: number;
    public companyName: string;
    public popularNews: PopularNewsBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class PopularNewsBaseDto{
    public newsId: number;
    public newsTitle: string;
    public companyId: number;
    public companyName: string;
    public popularityRatio: number;
    public date: Date;
}