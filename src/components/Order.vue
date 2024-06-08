<script setup lang="ts">
import { IOrderItem } from "@/types/OrderItem.ts";
import { formatPrice } from "@/helpers/formatPrice.ts";

const { id, totalPrice, discount, items } = defineProps<{
  id: string;
  totalPrice: number;
  discount: number;
  items: IOrderItem[];
}>();
</script>

<template>
  <div>
    <p class="id">Заказ №{{ id }}</p>
    <div class="top flex justify-between mb-4">
      <div>
        <p class="total-price-title">На общую сумму:</p>
        <p class="total-price">{{ formatPrice(totalPrice) }}</p>
      </div>
      <div>
        <p class="total-price-title">Скидка:</p>
        <p class="total-price">{{ formatPrice(discount) }}</p>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <router-link
        :to="`/catalog/${item.type}/${item._id}`"
        class="order-item flex items-center"
        v-for="item in items"
        :key="item._id"
      >
        <div>
          <img
            class="item-img"
            :src="`./src/assets/img/${item.imageUrl}`"
            alt=""
          />
        </div>
        <div class="flex flex-col gap-3 ml-3 pt-3 w-full pr-5">
          <p class="item-title">{{ item.title }}</p>
          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <span class="item-price">{{ formatPrice(item.price) }}</span>
              <span class="item-quantity">{{ item.quantity }} шт.</span>
            </div>
            <span class="item-total-price">{{
              formatPrice(item.price * item.quantity)
            }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.id {
  color: $gray;
  font-size: 25px;
  word-break: break-all;
}

.top {
  width: 500px;

  @media (max-width: 550px) {
    width: 100%;
  }
}

.total-price-title {
  color: $secondary;
  font-size: 20px;
}

.total-price {
  color: $secondary;
  font-size: 15px;
  font-weight: 700;
}

.order-item {
  border-radius: 4px;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  padding-bottom: 30px;
  width: 500px;

  @media (max-width: 550px) {
    width: 100%;
  }
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

.item-total-price {
  font-weight: 700;
  color: $secondary;
  font-size: 15px;
}
</style>
