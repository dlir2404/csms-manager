export interface IPayment {
    id: number;
    subtotal: number;
    vat: number;
    discount: number;
    total: number;
    paymentMethod: string;
    status: string;
    orderId: number;
    createdAt: string;
    updatedAt: string;
}