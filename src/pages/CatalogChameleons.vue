<script setup lang="ts">
import { onMounted, ref } from "vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import AnimalCard from "@/components/AnimalCard.vue";
import Footer from "@/components/Footer.vue";
import { getAnimals } from "@/helpers/getAnimals.ts";
import { IProduct } from "@/types/Product.ts";

const chameleons = ref<IProduct[]>([]);

onMounted(async () => {
  const { data } = await getAnimals("chameleons");
  if (data) chameleons.value = data;
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
        <span class="link active-link">Пантеровые хамелеоны</span>
      </div>
      <h3 class="mt-20 mb-20">Пантеровые хамелеоны</h3>
      <div class="chameleons">
        <AnimalCard
          v-for="chameleon in chameleons"
          :key="chameleon._id"
          v-bind="chameleon"
          show-favorite-button
        />
      </div>
      <div class="mt-80">
        <h4 class="animal-info-title">Уход и контакт с человеком</h4>
        <p class="animal-info-text">
          Среди всех хамелеонов пантеровый хамелеон (лат. Furcifer pardalis) —
          один из самых ярких. Для разных ареалов обитания характерны устойчивые
          цветовые формы. Окраска самцов очень разнообразна. Основной тон может
          быть зелёный, голубой, красный. По бокам проходит продольная
          прерывистая белая полоса, которая часто распадается на отдельные
          пятна. Самки не такие яркие. В их окрасе преобладают оранжевые,
          бежевые цвета с темно-бурыми вертикальными полосами. Молодые особи
          обычно имеют светло-бежевый окрас со слабой примесью зеленоватого или
          желтоватого оттенков. Пантеровые хамелеоны обитают в северной и
          восточной частях Мадагаскара и на ближайших островах Носи-Бе, о. Св.
          Марии и Носи Мангабен — в прибрежных областях с теплым и влажным
          климатом. Ведут дневной образ жизни. Размеры взрослого самца в длину —
          40-55 см, самки — до 35 см.
        </p>
        <p class="animal-info-text mt-10">
          Животные быстро адаптируются. Малыши обычно пугливы, но с возрастом
          это проходит. Хамелеона можно кормить с рук. Большую часть времени
          ящерица должна оставаться в террариуме, доставать рекомендуем не более
          2-3 раз в день по 15 минут. Не хватайте животное сверху, оно само
          заберется на руки. В хорошую погоду можно выгуливать на улице, но
          избегать перегрева или переохлаждения. В уходе пантеровые хамелеоны
          неприхотливы. На кормление уходит 5-10 минут в день, а уборку
          террариума — даже меньше. Менять грунт полностью не нужно, достаточно
          убирать мусор пинцетом или салфеткой. Хамелеоны не пачкают стекла,
          поэтому протирать их постоянно тоже не надо.
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

.chameleons {
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
