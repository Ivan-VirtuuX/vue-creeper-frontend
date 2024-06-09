import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth.store.ts";
import Home from "@/pages/Home.vue";
import Cart from "@/pages/Cart.vue";
import About from "@/pages/About.vue";
import Catalog from "@/pages/Catalog.vue";
import CatalogChameleons from "@/pages/CatalogChameleons.vue";
import CatalogSpiders from "@/pages/CatalogSpiders.vue";
import CatalogAmphibians from "@/pages/CatalogAmphibians.vue";
import Product from "@/pages/Product.vue";
import Profile from "@/pages/Profile.vue";
import Favorites from "@/pages/Favorites.vue";
import Search from "@/pages/Search.vue";
import OrderCheckout from "@/pages/OrderCheckout.vue";
import OrderSuccess from "@/pages/OrderSuccess.vue";

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: "/about",
      name: "About",
      component: About,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/catalog",
      name: "Catalog",
      component: Catalog,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/catalog/panther-chameleons",
      name: "CatalogChameleons",
      component: CatalogChameleons,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/catalog/spiders",
      name: "CatalogSpiders",
      component: CatalogSpiders,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/catalog/amphibians",
      name: "CatalogAmphibians",
      component: CatalogAmphibians,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/catalog/:name/:id",
      name: "Product",
      component: Product,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/favorites",
      name: "Favorites",
      component: Favorites,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: { bodyColor: "#022c19" },
    },
    {
      path: "/order-checkout",
      name: "OrderCheckout",
      component: OrderCheckout,
    },
    {
      path: "/order-success/:id",
      name: "OrderSuccess",
      component: OrderSuccess,
    },
  ],
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to) => {
  const privatePages = ["/profile", "/cart", "/favorites"];
  const authRequired = privatePages.includes(to.path);
  const auth: any = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/";
  }
});
