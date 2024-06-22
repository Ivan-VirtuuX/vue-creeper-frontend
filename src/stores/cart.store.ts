import { defineStore } from "pinia";
import { ref } from "vue";
import { ICartItem } from "@/types/CartItem.ts";
import { Api } from "@/api/index.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

export const useCartStore = defineStore("cart", () => {
  const authStore = useAuthStore();

  const cart = ref<ICartItem[]>([]);
  const order = ref<{
    items: ICartItem[];
    discount: number;
    totalPrice: number;
    bonus: number;
  }>();

  const fetchCart = async () => {
    try {
      const data = await Api().cart.get();

      cart.value = data.items.map(
        (item: { product: ICartItem; quantity: number }) => ({
          ...item.product,
          quantity: item.quantity,
          selected: false,
        })
      );
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const toggleItem = async (productId?: string, quantity = 1) => {
    try {
      const data = await Api().cart.addItem(productId);
      const existingItem = cart.value.find((item) => item._id === productId);

      if (existingItem)
        cart.value = cart.value.filter((item) => item._id !== productId);
      else cart.value.push({ ...data.product, quantity });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const increaseQuantity = async (productId: string) => {
    try {
      const item = cart.value.find((item) => item._id === productId);

      if (item) {
        item.quantity += 1;
        await Api().cart.updateItemQuantity(productId, item.quantity);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (productId: string) => {
    try {
      const item = cart.value.find((item) => item._id === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        await Api().cart.updateItemQuantity(productId, item.quantity);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItems = async (selectedIds: string[]) => {
    await Api().cart.deleteItems(selectedIds);
    cart.value = cart.value.filter((item) => !selectedIds.includes(item._id));
  };

  const createPreOrder = async (discount: number, bonus: number) => {
    try {
      const selectedItems = cart.value.filter((item) => item.selected);
      const totalPrice = selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      order.value = {
        items: selectedItems,
        discount,
        totalPrice: totalPrice - discount,
        bonus,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const createOrder = async (orderDetails: {
    fullName: string;
    phone: string;
    address: string;
    deliveryMethod: string;
  }) => {
    try {
      await authStore.updateDiscountBalance(
        order.value?.bonus as number,
        order.value?.discount || 0
      );

      return await Api().cart.createOrder({
        items: order.value?.items,
        ...orderDetails,
        totalPrice: order.value?.totalPrice,
        discount: order.value?.discount,
        bonus: order.value?.bonus,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const clearOrderedItems = async () => {
    const orderedItemIds = order.value?.items.map((item) => item._id) || [];

    cart.value = cart.value.filter(
      (item) => !orderedItemIds.includes(item._id)
    );

    await Api().cart.deleteItems(orderedItemIds);
  };

  return {
    cart,
    order,
    fetchCart,
    toggleItem,
    increaseQuantity,
    decreaseQuantity,
    deleteItems,
    createPreOrder,
    createOrder,
    clearOrderedItems,
  };
});
