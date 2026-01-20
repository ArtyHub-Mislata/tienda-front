import { UserRole } from "./UserRole";

export interface UserModel {
    id?: string;
    name: string;
    email: string;
    description: string;
    address: string
    imageProfileUrl: string;
    role: UserRole
}