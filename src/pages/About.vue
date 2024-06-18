<script setup lang="ts">
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="container">
    <div>
      <div class="flex items-center gap-4 mt-5">
        <router-link to="/">
          <span class="link">Главная</span>
        </router-link>
        <arrow-right-icon />
        <span class="link active-link">О нас</span>
      </div>
      <h3 class="mt-20">О нас</h3>
      <div class="flex flex-col gap-20">
        <p>
          Любовь к животным объединила нескольких энтузиастов и вдохновила их на
          создание уникального проекта под названием Creeper. С самого начала
          главными приоритетами компании являются: продвижение надлежащего
          содержания экзотических животных, предоставление качественных товаров
          и услуг, разведение животных в собственном питомнике и сохранение
          видов.
        </p>
        <p>
          На нашем сайте и в розничных магазинах представлен обширный
          ассортимент животных, террариумов, оборудования, декора и кормов.
          <br />
          В нашем магазине вы всегда сможете собрать полный комплект для
          содержания питомца, а если вы новичок, наши сотрудники с радостью
          помогут выбрать первое животное и обустроить идеальный террариум.
        </p>
      </div>
    </div>
    <div class="mb-80">
      <p class="features-title">Наши преимущества</p>
      <div class="features gap-10">
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/1.png" alt="feature img" />
          </div>
          <div class="feature-item-title">НИЗКИЕ ЦЕНЫ</div>
        </div>
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/2.png" alt="feature img" />
          </div>
          <div class="feature-item-title">
            БЕСПЛАТНАЯ ДОСТАВКА ЗАКАЗОВ ОТ 990 РУБЛЕЙ
          </div>
        </div>
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/3.png" alt="feature img" />
          </div>
          <div class="feature-item-title">ГАРАНТИЯ КАЧЕСТВА</div>
        </div>
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/4.png" alt="feature img" />
          </div>
          <div class="feature-item-title">
            ПОДДЕРЖКА И КОНСУЛЬТАЦИИ ПОСЛЕ ПРОДАЖИ
          </div>
        </div>
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/5.png" alt="feature img" />
          </div>
          <div class="feature-item-title">
            ГАРАНТИЯ НА ЖИЗНЬ И ЗДОРОВЬЕ ЖИВОТНОГО
          </div>
        </div>
        <div class="feature-item flex flex-col gap-7 items-center">
          <div>
            <img src="@/assets/img/features/6.png" alt="feature img" />
          </div>
          <div class="feature-item-title">СЕРТИФИЦИРОВАННЫЕ<br />ТОВАРЫ</div>
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

h3 {
  color: #fff;
  font-family: Nunito, sans-serif;
  font-size: clamp(25px, 5vw, 50px);
  font-weight: 700;
  text-align: center;
}

p {
  color: #fff;
  font-size: clamp(10px, 5vw, 20px);
  line-height: 150%;
  text-align: justify;
}

.features-title {
  color: #fff;
  font-size: clamp(25px, 5vw, 50px);
  text-align: center;
  margin-bottom: 40px;
  margin-top: 100px;
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  width: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  width: 258px;
  text-align: center;
  color: #fff;
}
</style>
