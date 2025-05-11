

export class SignUpDto{
    firstName?:string;
    lastName?:string;
    email?:string;
    password?:string;
}
export class SignInDto{
    username?:string;
    password?:string;
}
export class DefinePasswordInDto{
    token?:string;
    password?:string;
}
