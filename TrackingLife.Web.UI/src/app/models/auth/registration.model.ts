export class RegistrationModel{
    public firstName: string;
    public lastName: string;
    public code: string;
    public phone: string;
    public email: string;
    //public password: string;
    //public confirmPassword: string;

    public constructor(init?: Partial<RegistrationModel>){
        Object.assign(this, init);
    }
}
