export class WellnessCategoryModel {
    public id: number;
    public title: string;
    public bannerImageUrl: string;

    public constructor(init?: Partial<WellnessCategoryModel>) {
        Object.assign(this, init);
    }
}