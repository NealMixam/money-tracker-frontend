<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

const form = ref({ email: "", password: "", repeat_password: "" });
const validationErrors = ref({});

function validate() {
    validationErrors.value = {};
    if (!form.value.email) { validationErrors.value.email = "Введите email" };
    if (!form.value.password) {
        validationErrors.value.password = "Введите пароль";
    } else if (form.value.password.length < 6) {
        validationErrors.value.password = "Пароль должен быть не менее 6 символов";
    };
    if (!form.value.repeat_password) {
        validationErrors.value.repeat_password = "Повторите пароль";
    } else if (form.value.repeat_password !== form.value.password) {
        validationErrors.value.repeat_password = "Пароли не совпадают";
    }
    return Object.keys(validationErrors.value).length === 0;
}

async function handleSubmit() {
    if (!validate()) return;
    try {
        await auth.register({ email: form.value.email, password: form.value.password });
        router.push({ path: "/login", query: { registered: "1" } });
    } catch (e) { }
}
</script>

<template>
    <form class="auth-form" @submit.prevent="handleSubmit">
        <h1 class="auth-form__title">Регистрация</h1>

        <div class="auth-form__field">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" />
            <span v-if="validationErrors.email" class="auth-form__error">{{
                validationErrors.email
                }}</span>
        </div>

        <div class="auth-form__field">
            <label for="password">Пароль</label>
            <input id="password" v-model="form.password" type="password" autocomplete="new-password" />
            <span v-if="validationErrors.password" class="auth-form__error">{{
                validationErrors.password
                }}</span>
        </div>

        <div class="auth-form__field">
            <label for="repeat_password">Повторите пароль</label>
            <input id="repeat_password" v-model="form.repeat_password" type="password"
                autocomplete="new-password" />
            <span v-if="validationErrors.repeat_password" class="auth-form__error">{{
                validationErrors.repeat_password
                }}</span>
        </div>

        <p v-if="auth.error" class="auth-form__server-error">{{ auth.error }}</p>

        <button type="submit" :disabled="auth.isLoading">
            {{ auth.isLoading ? "Регистрация..." : "Зарегистрировать" }}
        </button>

        <router-link to="/login">Войти</router-link>
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
