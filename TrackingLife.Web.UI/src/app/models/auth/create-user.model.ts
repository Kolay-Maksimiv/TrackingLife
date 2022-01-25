export class CreateUserModel{
    public firstName: string;
    public lastName: string;
    public phone: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public companyId: number;
    public isActive: boolean;
    public createPasswordAutomatically: boolean;
    public role: string;

    public constructor(init?: Partial<CreateUserModel>){
        Object.assign(this, init);
    }
}
