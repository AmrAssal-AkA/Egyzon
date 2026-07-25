

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
        interface Request {
            user?: jwtPayload;
        }
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