import { ArtworkModel } from './ArtworkModel';

export interface CartItemModel {
  id: number;
  quantity: number;
  artwork: ArtworkModel;
}
