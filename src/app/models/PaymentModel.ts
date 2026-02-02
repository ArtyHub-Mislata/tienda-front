export interface PaymentModel {
    id?: number;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
    concept: string;
}