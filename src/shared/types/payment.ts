export interface IPayment {
  id: number
  subtotal: number
  vat: number
  discount: number
  total: number
  paymentMethod: string
  status: string
  orderId: number
  createdAt: string
  updatedAt: string
}

export interface IDayOverview {
  totalValue: number
  avgValue: number
  totalVat: number
  totalDiscount: number
}

export interface IPaymentStatusOverview {
  status: string
  count: number
}

export interface IMethodRatioOverview {
  method: string
  count: number
}

export interface IPaymentOverview {
  today: IDayOverview
  yesterday: IDayOverview
  statuses: IPaymentStatusOverview[]
  methodRatio: IMethodRatioOverview[]
  topPayments: IPayment[]
}
