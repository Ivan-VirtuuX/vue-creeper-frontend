<script setup lang="ts"></script>

<template>
  <footer>
    <div class="footer-container">
      <div class="container flex items-center justify-between gap-5 flex-wrap">
        <ul class="flex gap-2 flex-col">
          <li class="link">
            <router-link to="/about">О нас</router-link>
          </li>
          <li class="link">
            <router-link to="/catalog">Категории</router-link>
          </li>
          <li class="link">
            <a href="/#feedback">Обратная связь</a>
          </li>
        </ul>
        <router-link to="/">
          <img src="@/assets/logo-footer.png" alt="logo" />
        </router-link>
        <div class="contacts flex flex-col gap-3">
          <p>Контакты</p>
          <span>ул. Челюскинцев д. 20 к 4</span>
          <span>Ежедневно С 11:00 ДО 22:00</span>
          <span>8 960 977 39 78</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.footer-container {
  padding: 64px 0;
  border-bottom: 1px solid $secondary;
  width: 80%;
  margin: 0 auto;
}

footer {
  padding-top: 50px;
  padding-bottom: 50px;
  background: #fff;
}

.link {
  color: $primary;
  font-size: 15px;

  &:hover {
    color: $secondary;
  }
}

.right-link-text {
  color: #000;
  font-size: 10px;
  line-height: 150%;
}

.contacts {
  p {
    color: $primary;
    font-size: 20px;
  }
  span {
    color: $primary;
    font-size: 16px;
  }
}
</style>
