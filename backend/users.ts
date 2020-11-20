export class User {
    constructor(public email: string, 
                public name: string, 
                public password: string) {}

    matches(another: User): boolean {
        return another !== undefined &&
        another.email === this.email &&
        another.password === this.password
    }
}

export const users = {
    "carol@gmail.com": new User('carol@gmail.com', 'Carol', 'carol123'),
    "ana@gmail.com": new User('ana@gmail.com', 'Ana', 'ana123')
}