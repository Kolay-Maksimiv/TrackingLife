export class BalanceModel {
    public id: number;
    public constructor(init?: Partial<BalanceModel>) {
        Object.assign(this, init);
    }
}
