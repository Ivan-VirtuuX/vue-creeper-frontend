<script setup lang="ts">
import FavoriteButton from "@/components/FavoriteButton.vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import { storeToRefs } from "pinia";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { baseUrl } from "@/api/baseUrl.ts";
import { formatPrice } from "@/helpers/formatPrice.ts";
import { useCartStore } from "@/stores/cart.store.ts";

const {
  _id,
  type,
  title,
  desc,
  price,
  imageUrl,
  showFavoriteButton = false,
} = defineProps({
  _id: String,
  type: String,
  title: String,
  desc: String,
  price: Number,
  imageUrl: String,
  showFavoriteButton: Boolean,
});

const isFavorite = ref(false);
const inCart = computed(() => cartStore.cart.some((item) => item._id === _id));

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const cartStore = useCartStore();

const emits = defineEmits(["handleRemoveFavorite", "handleAddFavorite"]);

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      emits("handleRemoveFavorite");

      await axios.delete(
        `${baseUrl}/users/${authUser.value?.id}/favorites/${_id}`
      );

      isFavorite.value = false;
    } else {
      emits("handleAddFavorite");

      await axios.post(
        `${baseUrl}/users/${authUser.value?.id}/favorites/${_id}`
      );

      isFavorite.value = true;
    }
  } catch (err) {
    console.warn(err);
  }
};

const toggleCartItem = async () => {
  try {
    await cartStore.toggleItem(_id);
  } catch (err) {
    console.warn(err);
  }
};

onMounted(async () => {
  try {
    if (authUser.value) {
      const { data } = await axios.get(
        `${baseUrl}/users/${authUser.value?.id}/favorites`
      );

      data.find((favorite: { _id: string }) => favorite._id === _id)
        ? (isFavorite.value = true)
        : (isFavorite.value = false);
    }
  } catch (err) {
    console.warn(err);
  }
});
</script>

<template>
  <div class="animal-container">
    <router-link :to="`/catalog/${type}/${_id}`">
      <img :src="`/img/${imageUrl}`" alt="animal img" />
    </router-link>
    <div class="flex flex-col text-center pb-7 px-2">
      <p class="title">{{ title }}</p>
      <span v-if="desc" class="desc">{{ desc }}</span>
      <span class="price">{{ formatPrice(price) }}</span>
      <button
        v-show="authUser"
        v-if="inCart"
        class="button"
        @click="toggleCartItem"
      >
        Добавлен
      </button>
      <button v-show="authUser" v-else class="button" @click="toggleCartItem">
        В корзину
      </button>
    </div>
    <FavoriteButton
      v-show="authUser"
      :isFavorite
      @click="toggleFavorite"
      v-if="showFavoriteButton"
      class="favorite-button"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.animal-container {
  width: fit-content;
  border-radius: 8px;
  position: relative;
  background: rgba(112, 192, 91, 0.15);
}

.img {
  margin-bottom: 5px;
}

.title {
  font-family: "Nunito", sans-serif;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
}

.desc {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #fff;
  font-weight: 300;
  margin-bottom: 4px;
  margin-top: 5px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.button {
  border: 1px solid $secondary;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  color: $secondary;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: $secondary;
    color: #fff;
  }
}

.favorite-button {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
</style>
