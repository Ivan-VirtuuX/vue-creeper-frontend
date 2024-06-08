import { ICartItem } from "./CartItem";

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}
