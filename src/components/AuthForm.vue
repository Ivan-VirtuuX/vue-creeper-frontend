<script setup lang="ts">
import { ref, watch } from "vue";
import CrossIcon from "@/components/ui/icons/CrossIcon.vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm, FormState, GenericObject } from "vee-validate";

const isLogin = ref(true);
const error = ref("");

const registerValidationSchema = toTypedSchema(
  z
    .object({
      login: z
        .string({ required_error: "Логин обязателен" })
        .min(5, "Логин должен быть минимум 5 символов")
        .max(20, "Логин должен быть максимум 20 символов"),
      password: z
        .string({ required_error: "Пароль обязателен" })
        .min(8, "Пароль должен быть минимум 8 символов"),
      secondPassword: z
        .string({ required_error: "Повторите пароль" })
        .min(8, "Пароль должен быть минимум 8 символов"),
    })
    .refine((data) => data.password === data.secondPassword, {
      path: ["secondPassword"],
      message: "Пароли не совпадают",
    })
);

const loginValidationSchema = toTypedSchema(
  z.object({
    login: z
      .string({ required_error: "Логин обязателен" })
      .min(5, "Логин должен быть минимум 5 символов")
      .max(20, "Логин должен быть максимум 20 символов"),
    password: z.string().min(8, "Пароль должен быть минимум 8 символов"),
  })
);

const emits = defineEmits(["handleCloseModal"]);

const closeModal = () => {
  emits("handleCloseModal");
};

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const formSchema = ref<any>(
  isLogin.value ? loginValidationSchema : registerValidationSchema
);

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: formSchema,
});

const { value: login } = useField("login");
const { value: password } = useField("password");
const { value: secondPassword } = useField("secondPassword");

const onSubmit = handleSubmit(async (values) => {
  const authStore = useAuthStore();
  const { login, password } = values;

  try {
    if (isLogin.value) {
      await authStore.login(login, password);
    } else {
      await authStore.register(login, password);
    }
    closeModal();
  } catch (err: any) {
    console.log(err);
    error.value = err.message || err;
  }
});

watch(isLogin, (newValue) => {
  error.value = "";
  formSchema.value = newValue
    ? loginValidationSchema
    : registerValidationSchema;
  resetForm({
    values: {},
    schema: formSchema.value,
  } as Partial<FormState<GenericObject>>);
});
</script>

<template>
  <div class="modal">
    <div class="modal-content relative">
      <button class="close-button" @click="closeModal"><cross-icon /></button>
      <p class="form-type-title">
        {{ isLogin ? "Авторизация" : "Регистрация" }}
      </p>
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col">
            <p class="error">{{ errors.login }}</p>
            <label class="form-label" for="login">Логин</label>
            <input
              name="login"
              class="input"
              type="text"
              id="login"
              v-model="login"
              required
            />
          </div>
          <div class="flex flex-col">
            <p class="error">{{ errors.password }}</p>
            <label class="form-label" for="password">Пароль</label>
            <input
              name="password"
              class="input"
              type="password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div v-if="!isLogin" class="flex flex-col">
            <p class="error">{{ errors.secondPassword }}</p>
            <label class="form-label" for="secondPassword"
              >Повторите пароль</label
            >
            <input
              name="secondPassword"
              class="input"
              type="password"
              id="secondPassword"
              v-model="secondPassword"
              required
            />
          </div>
          <p class="error">{{ error }}</p>
        </div>
        <div class="flex items-center justify-between mt-6 select-none">
          <button
            class="form-change-type-button"
            @click="toggleForm"
            type="button"
          >
            {{ isLogin ? "Регистрация" : "Вход" }}
          </button>
          <button class="submit-button" type="submit" :disabled="isSubmitting">
            Отправить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(112, 192, 91, 0.32);
}

.modal-content {
  padding: 50px 80px;
  border-radius: 4px;
  box-shadow: 8px 16px 32px 0 rgba(255, 102, 51, 0.2);
  background: #fff;
}

.close-button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px;
  border-radius: 4px;
  background: rgb(243, 242, 241);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: $secondary;
  }
}

.form-type-title {
  color: $primary;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
}

.form-label {
  color: $gray;
  font-size: 18px;
}

.input {
  border: 1px solid $secondary;
  border-radius: 4px;
  box-shadow: 4px 8px 16px 0 rgba(112, 192, 91, 0.2);
  background: #fff;
  padding: 17px 16px;
  color: $primary;
  width: 260px;
}

.form-change-type-button {
  font-size: 12px;
  color: $secondary;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: $primary;
  }
}

.submit-button {
  border-radius: 4px;
  background: $secondary;
  padding: 7px 32px;
  font-size: 18px;
  color: #fff;

  &:disabled {
    background: $lightGray;
    color: $gray;
  }
}

.error {
  color: $orange;
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
