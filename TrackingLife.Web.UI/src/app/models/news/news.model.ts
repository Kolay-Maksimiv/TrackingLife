import { CategoryModel } from './../category/categories.model';
export class NewsModel {
    public title: string;
    public thumbnailImageUrl: string;
    public contentText: string;
    public contentHtml: string;
    public contentHtmlThumbnail: string;
    public dateTime: string;
    public publishedFrom: string;
    public publishedTo: string;
    public publishedFromStr: string;
    public publishedToStr: string;
    public level: string;
    public categoryList: CategoryModel[];
    public id: number;
    public isDeleted: boolean;
    public modifiedBy: string;
    public modifiedByImageUrl: string;
    public bannerImageUrl: string;
    public sendNotification: boolean;
    public showInNews: number;
    public allowComments: boolean;
    public allowEmojis: boolean;
    public selectPublish: number;

    public constructor(init?: Partial<NewsModel>) {
        Object.assign(this, init);
    }
}
