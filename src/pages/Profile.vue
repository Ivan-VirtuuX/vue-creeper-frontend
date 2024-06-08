<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExitIcon from "@/components/ui/icons/ExitIcon.vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import { IOrder } from "@/types/Order.ts";
import Order from "@/components/Order.vue";
import { Api } from "@/api/index.ts";

const orders = ref<IOrder[]>([]);

const authStore = useAuthStore();

onMounted(async () => {
  try {
    orders.value = await Api().user.getOrders(authStore?.user?.id);
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="container">
    <h3>Профиль</h3>
    <div class="flex items-center mb-7">
      <span class="login">{{ authStore.user?.login }}</span>
      <button @click="authStore.logout()">
        <exit-icon />
      </button>
    </div>
    <p class="orders-block-title">Заказы</p>
    <div class="flex flex-col gap-10 pb-10">
      <order
        v-for="order in orders"
        :id="order._id"
        :totalPrice="order.totalPrice"
        :discount="order.discount"
        :items="order.items"
      />
    </div>
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

.login {
  color: $primary;
  font-size: 30px;
  font-weight: 700;
  margin-right: 10px;
}

.orders-block-title {
  color: $primary;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
