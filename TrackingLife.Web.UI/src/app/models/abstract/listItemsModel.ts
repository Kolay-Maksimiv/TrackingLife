export class ListItemsModel {
    public items: any[];
    public counts: number;

    public constructor(init?: Partial<ListItemsModel>) {
        Object.assign(this, init);
    }
}
