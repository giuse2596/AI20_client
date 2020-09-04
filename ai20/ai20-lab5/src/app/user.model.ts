export interface Token{
    email;
    exp;
    iat;
    sub;
}

export class User{
    email: string;
    password: string;
    token: Token;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}