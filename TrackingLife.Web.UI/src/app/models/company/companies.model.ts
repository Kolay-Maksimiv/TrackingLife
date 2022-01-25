export class CompanyModel {
    public name: string;
    public uniqueCode: string;
    public id: number;
    public isDeleted: boolean;
    public sentNotification: boolean;
    public allowComments: boolean;
    public allowEmojis: boolean;

    public constructor(init?: Partial<CompanyModel>) {
        Object.assign(this, init);
    }
}
