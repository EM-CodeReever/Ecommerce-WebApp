import { User } from "@prisma/client";

export type LoginRequest = {
    email: string;
    password: string;
};
export type LoginResponse = {
    status: boolean;
    user: User | null;
    message: string;
};
