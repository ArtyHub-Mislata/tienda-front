import { CategoryModel } from "./CategoryModel";
import { UserModel } from "./UserModel";

export interface ArtworkModel {
    id?: number;
    name: string;
    description: string;
    image: string;
    price: number;
    categoryDto: CategoryModel;
    userDto: UserModel;
}