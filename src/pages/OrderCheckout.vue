<script setup lang="ts">
import { formatPrice } from "@/helpers/formatPrice.ts";
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart.store.ts";
import { router } from "@/helpers/router.ts";

const cartStore = useCartStore();

const fullName = ref("");
const phone = ref("");
const address = ref("");

const order = cartStore.order;

const submitOrder = async () => {
  try {
    await cartStore.clearOrderedItems();
    const createdOrder = await cartStore.createOrder({
      fullName: fullName.value,
      phone: phone.value,
      address: address.value,
    });
    await router.push(`/order-success/${createdOrder._id}`);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  if (order?.items === undefined) router.push("/cart");
});
</script>

<template>
  <div class="container">
    <h3 class="mb-10">Оформление заказа</h3>
    <div class="order-container flex justify-between gap-10">
      <div class="order-left flex flex-col gap-5 flex-1 pb-10">
        <div
          class="cart-item flex items-center justify-between"
          v-for="item in order?.items"
          :key="item?._id"
        >
          <div class="flex justify-between w-full">
            <div class="flex items-center">
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
            <div class="p-2 flex flex-wrap gap-3">
              <span class="item-total-quantity">{{ item.quantity }} шт.</span>
              <div class="item-total-price">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="submitOrder">
        <div class="flex flex-col gap-5 mb-6">
          <div class="flex flex-col">
            <label class="form-label" for="name">ФИО</label>
            <input
              class="form-input"
              type="text"
              id="name"
              v-model="fullName"
              required
            />
          </div>
          <div class="flex flex-col">
            <label class="form-label" for="phone">Телефон</label>
            <input
              class="form-input"
              type="text"
              id="phone"
              v-model="phone"
              required
            />
          </div>
          <div class="flex flex-col">
            <label class="form-label" for="address">Адрес доставки</label>
            <input
              class="form-input"
              type="text"
              id="address"
              v-model="address"
              required
            />
          </div>
        </div>
        <div class="flex flex-col">
          <div
            v-if="order?.discount"
            class="flex justify-between items-center mt-3"
          >
            <span class="cart-total-discount-title">Скидка</span>
            <span class="cart-total-discount-price"
              >-{{ formatPrice(order?.discount) }}</span
            >
          </div>
          <div class="flex justify-between w-full items-center">
            <span class="total-price-title">Итог</span>
            <span class="total-price">{{
              formatPrice(order?.totalPrice)
            }}</span>
          </div>
        </div>
        <button
          type="submit"
          class="btn confirm-btn"
          :disabled="!fullName || !phone || !address"
        >
          Подтвердить заказ
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

h3 {
  margin-top: 75px;
  color: $primary;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
}

.order-container {
  @media (max-width: 920px) {
    flex-direction: column-reverse;
    align-items: center;
  }
}

.order-left {
  @media (max-width: 920px) {
    width: 100%;
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

.item-total-quantity {
  font-weight: 500;
  color: $secondary;
  font-size: 15px;
}

.item-total-price {
  font-weight: 700;
  color: $primary;
}

.form-label {
  color: #8f8f8f;
  font-size: 16px;
}

.form-input {
  color: $primary;
  font-size: 16px;
  padding: 7px;
  border-radius: 4px;
  border: 1px solid #8f8f8f;
}

.cart-total-discount-title {
  color: $gray;
  font-size: 16px;
}

.cart-total-discount-price {
  color: rgb(255, 102, 51);
  font-size: 16px;
  font-weight: 700;
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

.confirm-btn {
  color: #fff;
  font-size: 24px;
  padding: 12px 42px;
  border-radius: 4px;
  background: $secondary;
  margin-top: 25px;
}
</style>
