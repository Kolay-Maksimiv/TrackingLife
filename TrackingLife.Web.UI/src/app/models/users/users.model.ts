export class UsersModel {
    public imageUrl: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
    public date: string;
    public id: string;
    public profileId: number;
    public isDeleted: boolean;
    public isActive: boolean;
    public companyId: number;
    public organisationName: string;
    public companyName: string;
    public role: string;
    public dateCreated: Date;
    public roles: string[];
    
    public constructor(init?: Partial<UsersModel>) {
        Object.assign(this, init);
    }
}
