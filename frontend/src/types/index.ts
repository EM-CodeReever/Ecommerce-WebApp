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

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }
  
 export enum Size {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
  }
  
export  enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    RATHER_NOT_SAY = "RATHER_NOT_SAY"
  }