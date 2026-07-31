<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();
const isInitializing = ref(true);

onMounted(async () => {
  await auth.init();
  isInitializing.value = false;
});
</script>

<template>
  <div v-if="isInitializing" class="app-loader">Загрузка...</div>
  <router-view v-else />
</template>

<style scoped>
.app-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 18px;
}
</style>
