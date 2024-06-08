<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import axios from "axios";
import { storeToRefs } from "pinia";
import AnimalCard from "@/components/AnimalCard.vue";
import { baseUrl } from "@/api/baseUrl.ts";
import { IProduct } from "@/types/Product.ts";

const favorites = ref<IProduct[]>([]);

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/users/${authUser?.value?.id}/favorites`
    );
    favorites.value = data;
  } catch (err) {
    console.warn(err);
  }
});
</script>

<template>
  <div class="container">
    <h3>Избранное</h3>
    <div class="favorites pb-10">
      <AnimalCard
        v-for="favorite in favorites"
        :key="favorite._id"
        v-bind="favorite"
        show-favorite-button
        :favorites="favorites"
        @handleRemoveFavorite="
          () => {
            favorites = favorites.filter((item) => item._id !== favorite._id);
          }
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

h3 {
  margin-top: 75px;
  color: #fff;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
}

.favorites {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  justify-content: space-between;
  row-gap: 100px;
  margin-top: 25px;

  @media (max-width: 605px) {
    justify-content: center;
  }
}
</style>
