<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const router = useRouter();

const performSearch = () => {
  if (searchQuery.value)
    router.push({ path: "/search", query: { text: searchQuery.value } });
};
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Найти товар"
      @keyup.enter="performSearch"
    />
    <button v-if="searchQuery" @click="performSearch">Найти</button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

input {
  font-size: 22px;
  border: 1px solid $secondary;
  color: $secondary;
  border-radius: 6px;
  background: #fff;
  padding: 8px 85px 8px 20px;

  &::placeholder {
    color: $gray;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
}

button {
  position: absolute;
  right: 10px;
  top: 8px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: $secondary;
  border-radius: 4px;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
