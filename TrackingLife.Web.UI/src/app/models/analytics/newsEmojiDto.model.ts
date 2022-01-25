export class NewsEmojiDto{
    public companyId: number;
    public companyName: string;
    public newsEmojis: NewsEmojiBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class NewsEmojiBaseDto{
    public newsId: number;
    public companyId: number;
    public companyName: string;
    public userName: string;
    public date: Date;
}