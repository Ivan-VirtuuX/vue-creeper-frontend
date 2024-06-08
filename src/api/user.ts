import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async getOrders(id?: string) {
    const { data } = await instance.get(`/users/${id}/orders`);
    return data;
  },
});
