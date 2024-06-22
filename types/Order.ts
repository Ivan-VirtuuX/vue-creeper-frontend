import { IOrderItem } from "./OrderItem";

export interface IOrder {
  _id: string;
  items: IOrderItem[];
  fullName: string;
  phone: string;
  address: string;
  totalPrice: number;
  discount: number;
  userId: string;
  deliveryMethod: string;
  createdAt: Date;
}
