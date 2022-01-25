interface LoginResponseModel {
    token: string;
    email: string;
    roles: string[];
    firstName: string;
    lastName: string;
    imageUrl: string;
    userId: string;
    organisationName: string;
    refreshToken: string;
    expiresIn: string; // time in misiseconds
    idToken: string;
    access_token: string;
    refresh_token: string;
    tokenType: string;
    scope: string;
}
