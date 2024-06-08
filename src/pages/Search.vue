<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { IProduct } from "@/types/Product.ts";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl.ts";
import AnimalCard from "@/components/AnimalCard.vue";

const route = useRoute();
const encodedQuery = route.query.text as string;

const query = ref(encodedQuery ? decodeURIComponent(encodedQuery) : "");
const searchResults = ref<IProduct[]>([]);
const chameleons = ref<IProduct[]>([]);
const amphibians = ref<IProduct[]>([]);
const spiders = ref<IProduct[]>([]);

const getAnimals = async (newValue: string = query.value) => {
  try {
    const { data } = await axios.get<IProduct[]>(`${baseUrl}/products/search`, {
      params: { text: newValue },
    });
    searchResults.value = data;

    chameleons.value = [];
    amphibians.value = [];
    spiders.value = [];

    data.forEach((product) => {
      if (product.type === "chameleons") {
        chameleons.value.push(product);
      } else if (product.type === "amphibians") {
        amphibians.value.push(product);
      } else if (product.type === "spiders") {
        spiders.value.push(product);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  if (query.value) getAnimals(query.value);
});

watch(query, async (newValue) => {
  if (newValue) await getAnimals(newValue);
});

watch(
  () => route.query.text,
  async (newValue) => {
    query.value = newValue ? decodeURIComponent(newValue) : "";
  }
);
</script>

<template>
  <div class="container">
    <div class="flex flex-col gap-6 mt-10 mb-6">
      <p class="search-result-title">Результат поиска</p>
      <p class="search-result-text">
        по запросу <span>{{ query }}</span>
      </p>
    </div>
    <div class="pb-10">
      <div v-if="chameleons.length !== 0">
        <p class="search-result-title">Пантеровые хамелеоны</p>
        <div class="results">
          <AnimalCard
            v-for="chameleon in chameleons"
            :key="chameleon._id"
            v-bind="chameleon"
          />
        </div>
      </div>
      <div v-if="amphibians.length !== 0" class="mt-10">
        <p class="search-result-title">Амфибии</p>
        <div class="results">
          <AnimalCard
            v-for="amphibian in amphibians"
            :key="amphibian._id"
            v-bind="amphibian"
          />
        </div>
      </div>
      <div v-if="spiders.length !== 0" class="mt-10">
        <p class="search-result-title">Пауки</p>
        <div class="results">
          <AnimalCard
            v-for="spider in spiders"
            :key="spider._id"
            v-bind="spider"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.search-result-title {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
}

.search-result-text {
  font-size: 24px;
  color: #fff;

  span {
    color: $secondary;
  }
}

.search-result-title {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
}

.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  justify-content: space-between;
  row-gap: 100px;
  column-gap: 20px;

  @media (max-width: 605px) {
    justify-content: center;
  }
}
</style>
