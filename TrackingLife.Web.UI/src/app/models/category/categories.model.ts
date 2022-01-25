export class CategoryModel {
    public name: string;
    public id: number;
    public isDeleted: boolean;

    public constructor(init?: Partial<CategoryModel>) {
        Object.assign(this, init);
    }
}
