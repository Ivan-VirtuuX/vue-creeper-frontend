<script setup lang="ts">
import Header from "./components/Header.vue";
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

onMounted(() => {
  const userId = authUser?.value?.id;
  if (userId) cartStore.fetchCart();
});

const router = useRouter();
const route = useRoute();

const updateBodyColor = () => {
  const bodyColor: string = (route.meta.bodyColor as string) || "#fff";
  document.body.style.backgroundColor = bodyColor;
};

onMounted(() => {
  updateBodyColor();
  router.afterEach(updateBodyColor);
});
</script>

<template>
  <Header />
  <router-view></router-view>
</template>
