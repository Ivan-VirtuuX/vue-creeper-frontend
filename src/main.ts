import { createApp } from "vue";
import "@/assets/main.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "@/helpers/router.ts";
import { useCartStore } from "@/stores/cart.store.ts";

const pinia = createPinia();

useCartStore(pinia);

createApp(App).use(router).use(pinia).mount("#app");
