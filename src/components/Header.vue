<script setup lang="ts">
import SearchInput from "@/components/SearchInput.vue";
import BurgerMenuIcon from "@/icons/BurgerMenuIcon.vue";
import { computed, ref, watch } from "vue";
import AuthForm from "@/components/AuthForm.vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart.store.ts";
import { useRouter } from "vue-router";

const showAuthModal = ref(false);

const openAuthModal = () => {
  showAuthModal.value = true;
};

const router = useRouter();

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const isAuth = computed(() => !!authUser.value);

const cartStore = useCartStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(router.currentRoute, () => {
  isMenuOpen.value = false;
});
</script>
<template>
  <header>
    <div
      class="relative container flex items-center justify-between gap-2"
      :style="{ justifyContent: !isMenuOpen ? 'space-between' : 'center' }"
    >
      <router-link v-if="!isMenuOpen" to="/" class="select-none">
        <div>
          <img src="@/assets/logo.png" alt="logo" />
        </div>
      </router-link>
      <search-input v-if="!isMenuOpen" />
      <ul class="links flex gap-10 items-center">
        <li class="link">
          <router-link to="/about">О нас</router-link>
        </li>
        <li class="link">
          <router-link to="/catalog">Категории</router-link>
        </li>
        <li class="link">
          <a href="/#feedback">Обратная связь</a>
        </li>
        <li class="link">
          <router-link v-if="isAuth" to="/profile">Профиль</router-link>
          <button v-else @click="openAuthModal">Регистрация</button>
        </li>
        <li class="select-none">
          <router-link to="/favorites">
            <div class="flex flex-col items-center">
              <img src="@/assets/svg/favorites.svg" alt="favorites" />
              <span class="right-link-text">Избранное</span>
            </div>
          </router-link>
        </li>
        <li class="select-none">
          <router-link to="/cart">
            <div class="flex flex-col items-center relative">
              <div
                v-if="cartStore.cart.length > 0"
                class="cart-counter flex justify-center items-center"
              >
                <span>{{ cartStore.cart.length }}</span>
              </div>
              <img src="@/assets/svg/cart.svg" alt="cart" />
              <span class="right-link-text">Корзина</span>
            </div>
          </router-link>
        </li>
      </ul>
      <div>
        <burger-menu-icon
          v-if="!isMenuOpen"
          class="burger-menu-icon"
          @click="toggleMenu"
        />
      </div>
      <ul
        v-if="isMenuOpen"
        class="burger-menu flex flex-col gap-4 items-center"
      >
        <li class="link">
          <router-link to="/about">О нас</router-link>
        </li>
        <li class="link">
          <router-link to="/catalog">Категории</router-link>
        </li>
        <li class="link">
          <a href="/#feedback">Обратная связь</a>
        </li>
        <li class="link">
          <router-link v-if="isAuth" to="/profile">Профиль</router-link>
          <button v-else @click="openAuthModal">Регистрация</button>
        </li>
        <li class="link">
          <router-link to="/favorites">
            <div class="flex flex-col items-center">
              <img src="@/assets/svg/favorites.svg" alt="favorites" />
              <span class="right-link-text">Избранное</span>
            </div>
          </router-link>
        </li>
        <li class="link">
          <router-link to="/cart">
            <div class="flex flex-col items-center relative">
              <div
                v-if="cartStore.cart.length > 0"
                class="cart-counter flex justify-center items-center"
              >
                <span>{{ cartStore.cart.length }}</span>
              </div>
              <img src="@/assets/svg/cart.svg" alt="cart" />
              <span class="right-link-text">Корзина</span>
            </div>
          </router-link>
        </li>
      </ul>
      <button v-if="isMenuOpen" class="close-btn" @click="toggleMenu">
        &times;
      </button>
    </div>
    <auth-form
      v-if="showAuthModal"
      @close="showAuthModal = false"
      @handleCloseModal="showAuthModal = false"
    />
  </header>
</template>
<style scoped lang="scss">
@import "@/assets/variables.scss";

header {
  padding: 20px 0;
  background: #fff;
}

.link {
  color: $primary;
  font-size: 15px;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: $secondary;
  }
}

.right-link-text {
  color: #000;
  font-size: 10px;
  line-height: 150%;
}

.cart-counter {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  background: rgb(255, 96, 7);
  padding: 3px 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  width: 11px;
  height: 11px;
}

.burger-menu {
  display: none;

  @media (max-width: 1240px) {
    display: flex;
  }
}

.burger-menu-icon {
  display: none;

  @media (max-width: 1240px) {
    display: block;
  }
}

.links {
  @media (max-width: 1240px) {
    display: none;
  }
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 0;
  font-size: 40px;
  color: $primary;
}
</style>
