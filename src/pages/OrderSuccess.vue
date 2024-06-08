<script setup lang="ts">
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart.store.ts";
import { router } from "@/helpers/router.ts";
import { useRoute } from "vue-router";

const cartStore = useCartStore();

const order = cartStore.order;

const route = useRoute();
const orderId = route.params.id as string;

// onMounted(() => {
//   if (order?.items === undefined) router.push("/profile");
// });
</script>

<template>
  <div class="container">
    <div class="flex flex-col items-center">
      <h4 class="mb-10">
        Заказ <span>{{ orderId }}</span>
      </h4>
      <p class="desc">
        Заказ успешно оформлен, в ближайшее время с вами свяжется наш менеджер
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

h4 {
  margin-top: 50px;
  margin-bottom: 10px;
  color: $primary;
  font-size: clamp(16px, 5vw, 32px);
  font-weight: 700;
  text-align: center;

  span {
    color: $secondary;
  }
}

.desc {
  color: $primary;
  font-size: clamp(12px, 5vw, 25px);
  width: 508px;
  text-align: center;

  @media (max-width: 520px) {
    width: 100%;
  }
}
</style>
