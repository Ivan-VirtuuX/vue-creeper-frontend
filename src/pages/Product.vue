<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl.ts";
import { formatPrice } from "../helpers/formatPrice.ts";
import { IProduct } from "@/types/Product.ts";
import { useAuthStore } from "@/stores/auth.store.ts";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart.store.ts";

const route = useRoute();

const id: string = route.params.id as string;

const animal = ref<IProduct>();

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const cartStore = useCartStore();
const inCart = computed(() => cartStore.cart.some((item) => item._id === id));

const convertAnimalType = (type: string) => {
  const types: any = {
    amphibians: "Амфибии",
    chameleons: "Пантеровые хамелеоны",
    spiders: "Пауки",
  };
  return types[type];
};

const toggleCartItem = async () => {
  try {
    await cartStore.toggleItem(id);
  } catch (err) {
    console.warn(err);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get<IProduct>(`${baseUrl}/products/${id}`);
    animal.value = data;
  } catch (err) {
    console.warn(err);
  }
});
</script>

<template>
  <div class="container">
    <div class="mb-80">
      <div class="flex items-center flex-wrap gap-4 mt-20">
        <router-link to="/">
          <span class="link">Главная</span>
        </router-link>
        <arrow-right-icon />
        <router-link to="/catalog">
          <span class="link active-link">Каталог</span>
        </router-link>
        <arrow-right-icon />
        <router-link to="/catalog">
          <span class="link active-link">{{
            convertAnimalType(animal?.type as string)
          }}</span> </router-link
        ><arrow-right-icon />
        <router-link to="/catalog">
          <span class="link active-link">{{ animal?.title }}</span>
        </router-link>
      </div>
      <h4>{{ animal?.title }}</h4>
      <div class="content flex justify-between gap-10">
        <div class="image-container">
          <img :src="`/img/${animal?.imageUrl}`" :alt="animal?.title" />
        </div>
        <div
          class="price-block flex items-end justify-between w-full flex-1 flex-wrap gap-5"
        >
          <span class="price">{{ formatPrice(animal?.price) }}</span>
          <div class="flex flex-col gap-10 items-center">
            <span class="in-stock-text">В наличии</span>
            <button
              v-show="authUser"
              v-if="inCart"
              class="cart-button"
              @click="toggleCartItem"
            >
              В корзине
            </button>
            <button
              v-show="authUser"
              v-else
              class="cart-button"
              @click="toggleCartItem"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.link {
  color: #fff;
  font-size: 12px;
}

.link {
  &:hover {
    color: $secondary;
  }
}

.active-link {
  color: $secondary;
}

h4 {
  color: #fff;
  font-family: Nunito, sans-serif;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 800;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.content {
  @media (max-width: 920px) {
    flex-direction: column;
    align-items: center;
  }
}

.image-container {
  border-radius: 9px;
  background: rgba(112, 192, 91, 0.15);
  width: fit-content;
  padding: 90px;
}

.price-block {
  @media (max-width: 920px) {
    flex-direction: column;
    align-items: center;
  }
}

.price {
  color: #fff;
  font-family: Rubik, sans-serif;
  font-size: clamp(30px, 5vw, 60px);
  font-weight: 700;
}

.in-stock-text {
  color: #fff;
  font-family: Rubik, sans-serif;
  font-size: 24px;
  border: 1px solid $secondary;
  border-radius: 60px;
  background: $secondary;
  padding: 13px 48px;
}

.cart-button {
  padding: 17px 63px;
  color: #fff;
  font-family: Rubik, sans-serif;
  font-size: 32px;
  border: 1px solid $secondary;
  border-radius: 20px;
  background: $secondary;
}
</style>
