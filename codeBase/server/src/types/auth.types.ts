

export interface jwtPayload {
    userId: string;
    role: 'customer' | 'seller' | 'admin';
}

export enum userRole {
    Customer = 'customer',
    Seller = 'seller',
    Admin = 'admin'
}

declare global {
    namespace Express {
        interface User extends jwtPayload {}
    }
}

export interface RegisterInput {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    role: userRole.Customer ;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RefreshTokenInput {
    refreshToken: string;
    userId: string;
    createdAt?: Date;
}