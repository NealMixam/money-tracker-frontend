<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

function handleLogout() {
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">Money Tracker</h1>
      <div class="dashboard__user">
        <span v-if="auth.user" class="dashboard__email">{{
          auth.user.email
        }}</span>
        <button class="dashboard__logout" @click="handleLogout">Выйти</button>
      </div>
    </header>

    <main class="dashboard__content">
      <section class="dashboard__summary">
        <div class="summary-card">
          <span class="summary-card__label">Общий баланс</span>
          <span class="summary-card__value">— ₽</span>
        </div>
        <div class="summary-card">
          <span class="summary-card__label">Доходы за месяц</span>
          <span class="summary-card__value summary-card__value--income"
            >— ₽</span
          >
        </div>
        <div class="summary-card">
          <span class="summary-card__label">Расходы за месяц</span>
          <span class="summary-card__value summary-card__value--expense"
            >— ₽</span
          >
        </div>
      </section>

      <section class="dashboard__transactions">
        <h2>Последние операции</h2>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f6fa;
}

.dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.dashboard__title {
  font-size: 20px;
  margin: 0;
}

.dashboard__user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dashboard__email {
  color: #555;
  font-size: 14px;
}

.dashboard__logout {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.dashboard__logout:hover {
  background: #f0f0f0;
}

.dashboard__content {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard__summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.summary-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.summary-card__label {
  font-size: 13px;
  color: #888;
}

.summary-card__value {
  font-size: 24px;
  font-weight: 600;
}

.summary-card__value--income {
  color: #2ea04d;
}

.summary-card__value--expense {
  color: #d33;
}

.dashboard__transactions {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.dashboard__transactions h2 {
  margin-top: 0;
  font-size: 16px;
}

.dashboard__placeholder {
  color: #999;
  font-size: 14px;
}
</style>
