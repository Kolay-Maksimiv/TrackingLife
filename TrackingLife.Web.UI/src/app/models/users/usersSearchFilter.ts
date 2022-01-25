import { UsersOrderType } from 'app/enums/usersOrderType';

export class UsersSearchFilter{
    constructor(
        public pageNumber: number,
        public take: number,
        public isRemoved: boolean,
        public orderType: UsersOrderType,
        public searchKeyWordByName: string,
        public searchKeyWordByEmail: string,
        public searchKeyWordByCompany: string,
        public searchByAccessLevel: string
    ){}
}