import { Password, User } from "@prisma/client";
import client from "./client";
import { LoginFormData, RegisterFormData } from "@/features/users/types";

interface AuthData {
    user: User,
    token: string
}



class Auth {
    private listeners: Set<Function>;
    private key: string;

    constructor() {
        this.listeners = new Set();
        this.key = "auth";
    }

    async register(data: RegisterFormData): Promise<AuthData> {
        const res = await client.post("/api/users", data)
        this.storeUser(res.data)
        this.listeners.forEach((listener: Function) => listener(res.data))
        return res.data
    }

    async login(data: LoginFormData ): Promise<AuthData> {
        const res = await client.post("/api/users/login",data);
        this.storeUser(res.data);
        this.listeners.forEach((listener: Function) => listener(res.data))
        return res.data
    }

    async logout() {
        this.listeners.forEach(listener => listener({user: null , token: null}))
        this.removeUser()
    }

    private storeUser(user: User) {
        localStorage.setItem(this.key, JSON.stringify(user))
    }

    private removeUser() {
        localStorage.removeItem(this.key)
    }

    getAuthData(): AuthData{
        const user = localStorage.getItem(this.key);
        return user ? JSON.parse(user) : {token: null , user: null}
    }

    addListener(listener: Function): Function {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

}

const auth = new Auth();

export default auth;