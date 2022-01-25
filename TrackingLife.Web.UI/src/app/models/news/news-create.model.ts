export class NewsCreateModel {
    public title: string;
    public contentText: string;
    public level: string;

    public constructor(init?: Partial<NewsCreateModel>) {
        Object.assign(this, init);
    }
}
