import { Data } from "@angular/router";

export class BalanceModel {
    public id: number;
    public uniqueAccount: string;
    public currentBalance: number;
    public lastTransactionDateTime: Data;
    public profileId: number;

    public constructor(init?: Partial<BalanceModel>) {
        Object.assign(this, init);
    }
}
