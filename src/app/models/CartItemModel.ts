import { ArtworkModel } from './ArtworkModel';

export interface CartItemModel {
  id: number;
  artwork: ArtworkModel;
  quantity: number;
}
