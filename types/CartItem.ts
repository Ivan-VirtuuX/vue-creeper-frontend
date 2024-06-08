export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  type: string;
  quantity: number;
  selected: boolean;
  imageUrl: string;
}
