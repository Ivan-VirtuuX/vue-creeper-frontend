<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useCartStore } from "@/stores/cart.store.ts";
import { formatPrice } from "../helpers/formatPrice.ts";
import { pluralizeProductCount } from "../helpers/pluralizeProductCount.ts";
import { ICartItem } from "@/types/CartItem.ts";
import { useAuthStore } from "@/stores/auth.store.ts";
import { router } from "@/helpers/router.ts";

const cartStore = useCartStore();
const authStore = useAuthStore();

const cart = ref<ICartItem[]>();
const loading = ref(true);
const isToggleOn = ref(false);
const discount = ref(0);

const totalWithoutDiscount = computed(() => {
  if (cart.value)
    return cart.value.reduce((total, item) => {
      if (item.selected) return total + item.price * item.quantity;
      else return total;
    }, 0);
  else return 0;
});

const totalWithDiscount = computed(
  () => totalWithoutDiscount.value - discount.value
);
const hasSelectedItems = computed(() =>
  cart.value ? cart?.value?.some((item) => item.selected) : false
);
const calculateBonus = computed(() =>
  Math.floor(totalWithDiscount.value * 0.01)
);

const selectAll = () => {
  if (cart.value) {
    const unselectedItems = cart.value.filter((item) => !item.selected);
    const newValue = unselectedItems.length > 0;

    cart.value.forEach((item) => {
      item.selected = newValue;
    });

    discount.value = 0;
    isToggleOn.value = false;
  }
};

const deleteSelected = async () => {
  if (cart.value) {
    const selectedItems = cart.value.filter((item) => item.selected);
    const selectedIds = selectedItems.map((item) => item._id);
    await cartStore.deleteItems(selectedIds);
    await cartStore.fetchCart();
    cart.value = cartStore.cart;
  }
};

const increaseQuantity = async (productId: string) => {
  await cartStore.increaseQuantity(productId);
};

const decreaseQuantity = async (productId: string) => {
  await cartStore.decreaseQuantity(productId);
};

const updateDiscount = () => {
  if (!isToggleOn.value)
    discount.value = Math.min(
      authStore.user?.discountBalance || 0,
      totalWithoutDiscount.value
    );
  else discount.value = 0;
};

const createPreOrder = async () => {
  try {
    await cartStore.createPreOrder(discount.value, calculateBonus.value);
    await router.push("/order-checkout");
  } catch (err) {
    console.error(err);
  }
};

watch([totalWithoutDiscount, isToggleOn], () => {
  if (!isToggleOn.value || totalWithoutDiscount.value < 50000)
    discount.value = 0;
  else
    discount.value = Math.min(
      authStore.user?.discountBalance || 0,
      totalWithoutDiscount.value
    );
});

onMounted(async () => {
  try {
    await cartStore.fetchCart();
    cart.value = cartStore.cart;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <h3 class="mb-10">Корзина</h3>
    <div
      v-if="cart?.length !== 0"
      class="cart-container flex justify-between gap-10 pb-10"
    >
      <div class="cart-left flex flex-col gap-5 flex-1">
        <div class="flex justify-between flex-wrap gap-2 mb-4">
          <button @click="selectAll" class="btn">Выделить всё</button>
          <button
            @click="deleteSelected"
            class="btn"
            :disabled="!hasSelectedItems"
          >
            Удалить выбранные
          </button>
        </div>
        <div
          class="cart-item flex items-center justify-between"
          v-for="item in cart"
          :key="item?._id"
        >
          <div class="flex justify-between w-full">
            <div class="flex items-center relative">
              <label class="custom-checkbox">
                <input
                  class="checkbox"
                  type="checkbox"
                  name="checkbox"
                  v-model="item.selected"
                />
                <span class="checkmark"></span>
              </label>
              <div>
                <img class="item-img" :src="`img/${item.imageUrl}`" alt="" />
              </div>
              <div class="ml-3">
                <p class="item-title">{{ item.title }}</p>
                <div class="flex gap-2">
                  <span class="item-price">{{ formatPrice(item.price) }}</span>
                  <span class="item-quantity">за шт.</span>
                </div>
              </div>
            </div>
            <div class="p-5 flex flex-wrap justify-end gap-7">
              <div class="flex gap-4 items-center">
                <button class="btn" @click="decreaseQuantity(item._id)">
                  −
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button class="btn" @click="increaseQuantity(item._id)">
                  +
                </button>
              </div>
              <div class="item-total-price">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-right">
        <div class="stored-money flex flex-col gap-5">
          <div
            v-if="
              authStore.user?.discountBalance &&
              hasSelectedItems &&
              totalWithoutDiscount >= 50000
            "
            class="toggle-container"
          >
            <label class="switch" @click="updateDiscount">
              <input
                type="checkbox"
                v-model="isToggleOn"
                :disabled="!hasSelectedItems || totalWithoutDiscount < 50000"
              />
              <span class="slider round"></span>
            </label>
            <span class="stored-money-title"
              >Списать {{ formatPrice(authStore.user?.discountBalance) }}</span
            >
          </div>
          <span class="stored-money-on-card-text">
            На карте накоплено
            {{ formatPrice(authStore.user?.discountBalance) }}
          </span>
        </div>
        <div class="total-orders">
          <div class="flex justify-between items-center">
            <span class="cart-total-quantity-title">{{
              pluralizeProductCount(cart?.length)
            }}</span>
            <span class="cart-total-quantity-price">{{
              formatPrice(totalWithoutDiscount)
            }}</span>
          </div>
          <div v-if="discount" class="flex justify-between items-center mt-3">
            <span class="cart-total-discount-title">Скидка</span>
            <span class="cart-total-discount-price"
              >-{{ formatPrice(discount) }}</span
            >
          </div>
        </div>
        <div>
          <div class="flex flex-col items-center">
            <div class="flex justify-between w-full items-center">
              <span class="total-price-title">Итог</span>
              <span class="total-price">{{
                formatPrice(totalWithDiscount)
              }}</span>
            </div>
            <div v-if="calculateBonus" class="flex gap-3 mt-2">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.6883 6.66663H1.31196C0.843143 6.66663 0.460308 7.05825 0.503301 7.52052C0.994639 13.0113 6.17826 17.3333 12.5001 17.3333C18.822 17.3333 24.0056 13.0133 24.497 7.52052C24.5379 7.05825 24.1571 6.66663 23.6883 6.66663Z"
                  fill="#70C05B"
                />
              </svg>
              <p class="bonus">
                Вы получаете <span>{{ calculateBonus }} бонусов</span>
              </p>
            </div>
          </div>
          <button
            @click="createPreOrder"
            class="btn cart-order-button"
            :disabled="!hasSelectedItems"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
    <p v-else class="cart-empty-text">Корзина пуста</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

h3 {
  margin-top: 75px;
  color: $primary;
  font-size: 64px;
  font-weight: 700;
}

.cart-container {
  @media (max-width: 920px) {
    flex-direction: column-reverse;
    align-items: center;
  }
}

.cart-item {
  border-radius: 4px;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}

.item-img {
  width: 77px;
  height: 61px;
  object-fit: cover;
}

.item-title {
  color: $primary;
  font-size: 16px;
}

.item-price {
  color: $primary;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 700;
}

.item-quantity {
  color: $primary;
  font-size: 12px;
}

.custom-checkbox {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  top: -10px;
  left: 8px;
}

.checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 3px;
  transition: all 0.2s ease-in-out;
}

.custom-checkbox input:checked ~ .checkmark {
  background: $secondary;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.btn {
  background: $secondary;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity {
  font-size: 18px;
  font-weight: 700;
  color: $primary;
}

.item-total-price {
  font-weight: 700;
  color: $primary;
}

.cart-left {
  @media (max-width: 920px) {
    width: 100%;
  }
}

.cart-right {
  width: 272px;
}

.stored-money {
  border-bottom: 2px solid rgb(243, 242, 241);
  padding-bottom: 25px;
  margin-bottom: 25px;
}

.stored-money-title {
  color: $primary;
  font-size: 16px;
}

.stored-money-on-card-text {
  color: $gray;
  font-size: 16px;
}

.toggle-container {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  margin-right: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.15);
}

input:checked + .slider {
  background-color: $secondary;
}

input:checked + .slider:before {
  transform: translateX(21px);
}

.cart-total-quantity-title,
.cart-total-discount-title {
  color: $gray;
  font-size: 16px;
}

.cart-total-quantity-price {
  color: $primary;
  font-size: 16px;
}

.cart-total-discount-price {
  color: rgb(255, 102, 51);
  font-size: 16px;
  font-weight: 700;
}

.total-orders {
  border-bottom: 2px solid rgb(243, 242, 241);
  padding-bottom: 25px;
  margin-bottom: 25px;
}

.bonus {
  color: $secondary;
  font-family: Roboto, sans-serif;
  font-size: 12px;

  span {
    font-weight: 700;
  }
}

.total-price-title {
  color: $gray;
  font-family: Rubik, sans-serif;
  font-size: 16px;
}

.total-price {
  color: $primary;
  font-family: Rubik, sans-serif;
  font-size: 24px;
  font-weight: 700;
}

.cart-order-button {
  color: #fff;
  font-size: 24px;
  padding: 12px 42px;
  border-radius: 4px;
  background: $secondary;
  margin-top: 25px;
}

.cart-empty-text {
  color: $gray;
  font-size: 20px;
  font-weight: 700;
  margin-top: 25px;
}
</style>
