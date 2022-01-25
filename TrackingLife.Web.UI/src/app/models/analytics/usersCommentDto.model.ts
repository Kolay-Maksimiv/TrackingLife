export class UsersCommentDto{
    public companyId: number;
    public companyName: string;
    public usersComments: UsersCommentBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class UsersCommentBaseDto{
    public commentId: number;
    public companyId: number;
    public companyName: string;
    public userName: string;
    public date: Date;
}