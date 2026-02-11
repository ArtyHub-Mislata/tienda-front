import { OrderItemModel } from './OrderItemModel';
import { UserModel } from './UserModel';

export interface OrderModel {
  id: number;
  orderItems: OrderItemModel[];
  user: UserModel;
}
