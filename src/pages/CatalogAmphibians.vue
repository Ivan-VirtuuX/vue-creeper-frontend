<script setup lang="ts">
import { onMounted, ref } from "vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import AnimalCard from "@/components/AnimalCard.vue";
import Footer from "@/components/Footer.vue";
import { getAnimals } from "@/helpers/getAnimals.ts";
import { IProduct } from "@/types/Product.ts";

const amphibians = ref<IProduct[]>([]);

onMounted(async () => {
  const { data } = await getAnimals("amphibians");
  if (data) amphibians.value = data;
});
</script>

<template>
  <div class="container">
    <div class="mb-80">
      <div class="flex items-center gap-4 mt-20">
        <router-link to="/">
          <span class="link">Главная</span>
        </router-link>
        <arrow-right-icon />
        <router-link to="/catalog">
          <span class="link active-link">Каталог</span>
        </router-link>
        <arrow-right-icon />
        <span class="link active-link">Амфибии</span>
      </div>
      <h3 class="mt-20 mb-20">Амфибии</h3>
      <div class="amphibians">
        <AnimalCard
          v-for="amphibian in amphibians"
          :key="amphibian._id"
          v-bind="amphibian"
          show-favorite-button
        />
      </div>
      <div class="mt-80">
        <h4 class="animal-info-title mt-20">Уход и контакт с человеком</h4>
        <p class="animal-info-text">
          У любителей необычных питомцев сейчас пользуются популярностью
          домашние лягушки и жабы. Земноводные — большой класс холоднокровных
          позвоночных. Выбор действительно огромен — от маленьких юрких
          красноглазых квакш до огромных степенных рогатых лягушек.
          <br />Амфибии неприхотливы в уходе, за ними весьма интересно
          наблюдать. Яркая окраска радует глаз, а вечернее пение питомца создаст
          в доме необычную атмосферу.
        </p>
        <p class="animal-info-text mt-20">
          Кожа амфибий очень тонкая и легко впитывает все, что с ней
          контактирует. Температура тела человека выше, чем у земноводного,
          поэтому контакт с вашими горячими руками вызовет стресс. Поэтому,
          прежде чем брать лягушку, стоит тщательно вымыть и увлажнить руки.
        </p>
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

h3 {
  color: #fff;
  font-family: Nunito, sans-serif;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 100px;
  text-align: center;
}

.amphibians {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  justify-content: space-between;
  row-gap: 100px;
  column-gap: 20px;

  @media (max-width: 605px) {
    justify-content: center;
  }
}

.spiders-info-list {
  list-style-type: disc;
  color: #fff;

  li {
    margin-left: 50px;
  }
}
</style>
