export class RefreshModel{
    constructor(
        public grant_type: string, 
        public client_id: string, 
        public refresh_token: string){}
}
