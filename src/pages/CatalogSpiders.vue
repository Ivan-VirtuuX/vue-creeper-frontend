<script setup lang="ts">
import { onMounted, ref } from "vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import AnimalCard from "@/components/AnimalCard.vue";
import Footer from "@/components/Footer.vue";
import { getAnimals } from "@/helpers/getAnimals.ts";
import { IProduct } from "@/types/Product.ts";

const spiders = ref<IProduct[]>([]);

onMounted(async () => {
  const { data } = await getAnimals("spiders");
  if (data) spiders.value = data;
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
        <span class="link active-link">Пауки</span>
      </div>
      <h3 class="mt-20 mb-20">Пауки</h3>
      <div class="spiders">
        <AnimalCard
          v-for="spider in spiders"
          :key="spider._id"
          v-bind="spider"
          show-favorite-button
        />
      </div>
      <div class="mt-80">
        <p class="animal-info-text">
          Птицееды входят в топ самых экзотических питомцев, однако не многие
          знают об их преимуществах. <br />
          1. Минимальный уход — пауки не требуют сложного ухода, взрослый паук
          ест 1-2 раза в месяц, а иногда даже устраивает голодовку на несколько
          месяцев; <br />2. Компактность — они не требуют большого пространства,
          для них разработаны нано-террариумы, которые могут стать прекрасным
          украшением письменного стола; <br />
          3. Отсутствие запаха — птицееды не пахнут и крайне редко ходят в
          туалет! <br />
          4. Они не издают никаких звуков, не оставляют волосы по всей квартире
          и не портят вашу мебель; <br />
          5. Они нереально экзотичные и точно привлекут внимание ваших гостей!
        </p>
        <h4 class="animal-info-title mt-20">Уход и контакт с человеком</h4>
        <p class="animal-info-text">
          Пауки-птицееды делятся на наземных, норных и древесных, в зависимости
          от своего образа жизни. Для взрослого наземного паука минимальный
          размер террариума — 20×20×20 см, для древесного или норного —
          20×20×30. Можно использовать террариум большего размера, однако не
          переусердствуйте, ведь в слишком большом террариуме вы попросту
          потеряете своего питомца. В качестве грунта используется древесный
          субстрат, который увлажняется вокруг поилки. Основные элементы декора:
          небольшая поилка с низкими бортиками и укрытие. Можно установить
          искусственные растения и фон, эти элементы создадут дополнительную
          поверхность для передвижения паука и придадут террариуму натуральный
          вид. Приручить птицееда в той классической форме, о которой мы
          привыкли говорить, увы, не получится. Однако существуют спокойные и
          неспокойные виды. Спокойных пауков можно брать на руки, но делать это
          нужно осторожно и не часто. Паук — существо хрупкое и нежное, и
          падение может стать для него смертельным. Также нужно учитывать, что
          это животное, и гарантии, что оно никогда вас не укусит, никто дать не
          сможет. Даже паук, который относится к спокойным видам, может
          оказаться «с характером». Прежде, чем взять паука в руки, понаблюдайте
          за него поведением. Если вы видите, что он:
        </p>
        <ol class="spiders-info-list">
          <li class="animal-info-text">Трет брюшко задними лапками;</li>
          <li class="animal-info-text">Резко и быстро передвигается;</li>
          <li class="animal-info-text">
            Прячется и пытается максимально закрываться, складывая лапки.
          </li>
        </ol>
        <p class="animal-info-text">
          Таким образом паук показывает, что ему страшно, неприятно и он готов
          убежать. Если он поднял передние лапки вверх
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

.spiders {
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
