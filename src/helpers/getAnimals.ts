import axios from "axios";
import { baseUrl } from "@/api/baseUrl.ts";

export const getAnimals = async (type: string) => {
  return await axios.get(`${baseUrl}/products?type=${type}`);
};
