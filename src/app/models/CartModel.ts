import { CartItemModel } from './CartItemModel';
import { UserModel } from './UserModel';

export interface CartModel {
  id: number;
  cartItems: CartItemModel[];
  userDto: UserModel;
}
