import { Status } from "./StatusModel";

export interface PaymentModel {
    id?: number;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
    concept: string;
    amount: number;
    status: Status;
}