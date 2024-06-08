import axios from "axios";
import { CartApi } from "@/api/cart.ts";
import { useAuthStore } from "@/stores/auth.store.ts";
import { baseUrl } from "@/api/baseUrl.ts";
import { UserApi } from "@/api/user.ts";

export type ApiReturnType = {
  cart: ReturnType<typeof CartApi>;
  user: ReturnType<typeof UserApi>;
};

export const Api = (): ApiReturnType => {
  const { user } = useAuthStore();

  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: "Bearer " + user?.token,
    },
  });

  const apis = {
    cart: CartApi,
    user: UserApi,
  };

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
};
