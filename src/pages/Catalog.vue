<script setup lang="ts">
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="container">
    <div class="mb-80">
      <div class="flex items-center gap-4 mt-20">
        <router-link to="/">
          <span class="link">Главная</span>
        </router-link>
        <arrow-right-icon />
        <span class="link active-link">Каталог</span>
      </div>
      <h3 class="mt-20">Каталог</h3>
      <div class="catalog flex justify-between flex-wrap">
        <router-link to="/catalog/amphibians">
          <div class="item flex flex-col items-center">
            <div>
              <img src="@/assets/img/catalog-page/1.png" alt="" />
            </div>
            <span class="items-title">Амфибии</span>
          </div>
        </router-link>
        <router-link to="/catalog/panther-chameleons">
          <div class="item flex flex-col items-center">
            <div>
              <img src="@/assets/img/catalog-page/2.png" alt="" />
            </div>
            <span class="items-title text-center"
              >Пантеровые <br />
              Хамелеоны</span
            >
          </div>
        </router-link>
        <router-link to="/catalog/spiders">
          <div class="item flex flex-col items-center">
            <div>
              <img src="@/assets/img/catalog-page/3.png" alt="" />
            </div>
            <span class="items-title">Пауки</span>
          </div>
        </router-link>
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
  margin-bottom: 25px;
}

.items-title {
  color: #fff;
  font-family: Nunito, sans-serif;
  font-size: 36px;
  font-weight: 700;
}

.catalog {
  @media (max-width: 600px) {
    justify-content: center;
  }
}
</style>
