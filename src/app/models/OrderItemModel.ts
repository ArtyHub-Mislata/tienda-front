import { ArtworkModel } from './ArtworkModel';

export interface OrderItemModel {
  id: number;
  quantity: number;
  price: number;
  artwork: ArtworkModel;
}
