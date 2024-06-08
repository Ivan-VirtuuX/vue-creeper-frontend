import { AxiosInstance } from "axios";
import { ICartItem } from "@/types/CartItem.ts";

export const CartApi = (instance: AxiosInstance) => ({
  async get() {
    const { data } = await instance.get("/cart");
    return data;
  },

  async addItem(id?: string) {
    const { data } = await instance.post(`/cart/toggle-item/${id}`);
    return data;
  },

  async updateItemQuantity(id: string, quantity: number) {
    const { data } = await instance.put(`/cart/update-item/${id}`, {
      quantity,
    });
    return data;
  },

  async deleteItems(selectedIds: string[]) {
    await instance.delete("/cart/delete-items", {
      data: { selectedIds },
    });
  },

  async createOrder({
    items,
    fullName,
    phone,
    address,
    totalPrice,
    discount,
    bonus,
  }: {
    items?: ICartItem[];
    fullName: string;
    phone: string;
    address: string;
    totalPrice?: number;
    discount?: number;
    bonus?: number;
  }) {
    const { data } = await instance.post("/cart/create-order", {
      items,
      fullName,
      phone,
      address,
      totalPrice,
      discount,
      bonus,
    });
    return data;
  },
});
