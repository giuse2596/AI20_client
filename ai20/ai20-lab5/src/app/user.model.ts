export interface Token{
    email;
    exp;
    iat;
    sub;
}

export class User{
    id: string;
    name: string;
    firstName: string;
    email: string;
    password: string;
    token: Token;

    constructor(email: string, password: string, id?: string, name?: string, firstName?: string){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
    }

}
