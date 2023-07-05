import { Password, User } from "@prisma/client";

export interface RegisterFormData {
    email: string;
    name: string;
    password: string;
}


export interface LoginFormData {
    email: string;
    password: string;
}
