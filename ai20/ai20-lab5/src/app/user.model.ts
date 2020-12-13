export interface Token{
    email;
    exp;
    iat;
    sub;
    roles;
}

export class User{
    username: string;
    name: string;
    firstname: string;
    email: string;
    password: string;
    token: Token;

    constructor(email: string, password: string, username?: string, name?: string, firstName?: string){
        this.username = username;
        this.name = name;
        this.firstname = firstName;
        this.email = email;
        this.password = password;
    }

}
