import { CardModel } from './CardModel';
import { Status } from './StatusModel';

export interface PaymentModel {
  id?: number;
  cardDto: CardModel;
  concept: string;
  amount: number;
  status: Status;
}
