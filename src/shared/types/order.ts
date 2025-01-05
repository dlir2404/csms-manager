import { IProduct } from './product'
import { IUser } from './user'

export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

export interface IOder {
  id: number
  totalPrice: number
  note?: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
  products: IProduct[]
  createBy: IUser
  processBy: IUser
}

export interface IDayOverview {
  totalOrders: number
  totalOrderValue: number
  avgOrderValue: number
  totalItems: number
}

export interface IOrderStatusOverview {
  status: string
  count: number
}

export interface IOrderActionBy {
  name: string
  order: number
  total_value: number
}

export interface IProductRatioOverview {
  name: string
  order: number
}

export interface IOrderOverview {
  today: IDayOverview
  yesterday: IDayOverview
  statuses: IOrderStatusOverview[]
  createdBy: IOrderActionBy[]
  processBy: IOrderActionBy[]
  productRatio: IProductRatioOverview[]
}
