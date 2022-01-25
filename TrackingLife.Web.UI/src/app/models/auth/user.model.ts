export class User {
    constructor(
        public email: string,
        public roles: string[],
        public firstName: string,
        public lastName: string,
        public imageUrl: string,
        public organisationName: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    //get
     token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }

        return this.token;
    }
}
