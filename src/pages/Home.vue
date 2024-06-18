<script setup lang="ts">
import { onMounted, ref } from "vue";
import AnimalCard from "@/components/AnimalCard.vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { IProduct } from "@/types/Product.ts";
import { baseUrl } from "@/api/baseUrl.ts";

const chameleons = ref<IProduct[]>([]);
const amphibians = ref<IProduct[]>([]);
const spiders = ref<IProduct[]>([]);

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitted = ref(false);

const submitFeedback = async (event: Event) => {
  event.preventDefault();

  try {
    await axios.post(`${baseUrl}/feedback`, {
      ...form.value,
    });
  } catch (err) {
    console.warn(err);
  } finally {
    submitted.value = true;
  }
};

onMounted(async () => {
  try {
    const chameleonsRes = await axios.get(
      `${baseUrl}/products/first-by-type?type=chameleons`
    );
    chameleons.value = chameleonsRes.data;

    const amphibiansRes = await axios.get(
      `${baseUrl}/products/first-by-type?type=amphibians`
    );
    amphibians.value = amphibiansRes.data;

    const spidersRes = await axios.get(
      `${baseUrl}/products/first-by-type?type=spiders`
    );
    spiders.value = spidersRes.data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <section class="intro">
    <div class="container intro-container flex justify-end h-full">
      <div>
        <img
          src="@/assets/img/home-page/intro.png"
          alt="intro img"
          class="intro-img"
        />
      </div>
      <h1 class="intro-title flex items-center">
        Огромный выбор экзотических питомцев!
      </h1>
    </div>
  </section>
  <section class="about">
    <div class="container">
      <h2 class="about-title">Creeper — Зооцентр экзотических животных.</h2>
      <p class="about-desc">
        Creeper предоставляет широкий ассортимент экзотических животных таких
        как хамелеоны, пауки и амфибии. Мы предоставляем полный спектр услуг,
        включая онлайн-консультирование, помощь с выбором террариумов. Если вы
        новичок, наши сотрудники с радостью помогут выбрать первое животное и
        помочь выбрать идеальный террариум.
      </p>
    </div>
  </section>
  <section class="choose-animal">
    <div class="container">
      <h2 class="choose-animal-title">Выбери своего любимца</h2>
      <div class="mb-12">
        <div class="flex items-center justify-between flex-wrap gap-5">
          <h3 class="choose-animal-animal-title">Пантеровые хамелеоны</h3>
          <button>
            <router-link
              to="/catalog/panther-chameleons"
              class="flex items-center gap-10 catalog-button"
            >
              <span>Каталог</span>
              <arrow-right-icon />
            </router-link>
          </button>
        </div>
        <div class="mt-10 choose-animal-catalog">
          <animal-card
            v-for="chameleon in chameleons"
            v-bind="chameleon"
            show-favorite-button
          />
        </div>
      </div>
      <div class="mb-12">
        <div class="flex items-center justify-between flex-wrap gap-5">
          <h3 class="choose-animal-animal-title">Пауки</h3>
          <button>
            <router-link
              to="/catalog/spiders"
              class="flex items-center gap-10 catalog-button"
            >
              <span>Каталог</span>
              <arrow-right-icon />
            </router-link>
          </button>
        </div>
        <div class="mt-10 choose-animal-catalog">
          <animal-card
            v-for="spider in spiders"
            v-bind="spider"
            show-favorite-button
          />
        </div>
      </div>
      <div class="mb-20">
        <div class="flex items-center justify-between flex-wrap gap-5">
          <h3 class="choose-animal-animal-title">Амфибии</h3>
          <button>
            <router-link
              to="/catalog/amphibians"
              class="flex items-center gap-10 catalog-button"
            >
              <span>Каталог</span>
              <arrow-right-icon />
            </router-link>
          </button>
        </div>
        <div class="mt-10 choose-animal-catalog">
          <animal-card
            v-for="amphibian in amphibians"
            v-bind="amphibian"
            show-favorite-button
          />
        </div>
      </div>
    </div>
  </section>
  <section id="feedback" class="feedback mb-40">
    <h3 class="feedback-title">Обратная связь</h3>
    <div class="flex justify-center">
      <div v-if="submitted" class="feedback-success-text">
        Спасибо за ваш отзыв!
      </div>
      <form
        v-else
        @submit.prevent="submitFeedback"
        class="feedback-form"
        action=""
      >
        <div class="flex flex-col gap-5">
          <div class="flex flex-col">
            <label for="name" class="feedback-label">Имя</label>
            <input
              class="feedback-input"
              v-model="form.name"
              type="text"
              name="name"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="email" class="feedback-label">Email</label>
            <input
              class="feedback-input"
              v-model="form.email"
              type="email"
              name="email"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="message" class="feedback-label">Сообщение</label>
            <input
              class="feedback-input"
              v-model="form.message"
              type="text"
              name="message"
              required
            />
          </div>
        </div>
        <div class="flex justify-center mt-8">
          <button type="submit" class="feedback-button">Отправить</button>
        </div>
      </form>
    </div>
  </section>
  <Footer />
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.intro {
  height: 750px;

  @media (max-width: 1140px) {
    height: 500px;
  }
}

.intro-container {
  @media (max-width: 1140px) {
    justify-content: center;
  }
}

.intro-img {
  position: absolute;
  left: 0;

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 1140px) {
    display: none;
  }
}

.intro-title {
  font-family: "Nunito", sans-serif;
  font-size: clamp(32px, 10vw, 64px);
  font-weight: 500;
  text-align: right;
  width: 640px;
  color: #fff;

  @media (max-width: 1140px) {
    text-align: center;
  }
}

.about {
  margin: 150px 0;
}

.about-title,
.about-desc {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  margin-bottom: 50px;
  color: #fff;
}

.about-title {
  font-size: clamp(25px, 5vw, 50px);
}

.about-desc {
  font-size: clamp(18px, 5vw, 36px);
  font-weight: 500;
  text-align: justify;
}

.choose-animal-title {
  font-family: "Nunito", sans-serif;
  font-size: clamp(25px, 5vw, 50px);
  font-weight: 700;
  margin-bottom: 50px;
  color: #fff;
  text-align: center;
}

.choose-animal-animal-title {
  color: #fff;
  font-size: clamp(18px, 5vw, 36px);
  font-weight: 700;
}

.choose-animal-catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  justify-content: space-between;
  row-gap: 100px;
  column-gap: 20px;

  @media (max-width: 605px) {
    justify-content: center;
  }
}

.catalog-button {
  font-size: 16px;
  color: #fff;
}

.feedback-title {
  font-family: "Nunito", sans-serif;
  color: #fff;
  font-size: clamp(25px, 5vw, 50px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
}

.feedback-form {
  padding: 40px 60px;
  width: fit-content;
  border-radius: 10px;
  background: #fff;

  @media (max-width: 400px) {
    width: calc(100% - 25px);
  }
}

.feedback-label {
  color: $gray;
  font-size: 18px;
}

.feedback-input {
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
}

.feedback-button {
  padding: 7px 32px;
  color: #fff;
  font-size: 18px;
  border-radius: 4px;
  background: $secondary;
}

.feedback-success-text {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
}
</style>
