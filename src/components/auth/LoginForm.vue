<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

const form = ref({ email: "", password: "" });
const validationErrors = ref({});

function validate() {
  validationErrors.value = {};
  if (!form.value.email) validationErrors.value.email = "Введите email";
  if (!form.value.password) validationErrors.value.password = "Введите пароль";
  return Object.keys(validationErrors.value).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;
  try {
    await auth.login(form.value);
    router.push("/");
  } catch (e) {}
}
</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h1 class="auth-form__title">Вход</h1>

    <div class="auth-form__field">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        autocomplete="email"
      />
      <span v-if="validationErrors.email" class="auth-form__error">{{
        validationErrors.email
      }}</span>
    </div>

    <div class="auth-form__field">
      <label for="password">Пароль</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        autocomplete="current-password"
      />
      <span v-if="validationErrors.password" class="auth-form__error">{{
        validationErrors.password
      }}</span>
    </div>

    <p v-if="auth.error" class="auth-form__server-error">{{ auth.error }}</p>

    <button type="submit" :disabled="auth.isLoading">
      {{ auth.isLoading ? "Входим..." : "Войти" }}
    </button>

    <router-link to="/register">Нет аккаунта? Зарегистрироваться</router-link>
  </form>
</template>

<style scoped>
.auth-form {
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.auth-form__field input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.auth-form__error {
  color: #d33;
  font-size: 12px;
}

.auth-form__server-error {
  color: #d33;
  text-align: center;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #3d7dfd;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
