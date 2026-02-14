<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();

onMounted(() => {
  const expiredAt = localStorage.getItem('expiredAt');
  if (expiredAt && new Date().getTime() > parseInt(expiredAt)) {
    localStorage.removeItem('isPassed');
    localStorage.removeItem('expiredAt');
    router.push('/pass')
  }
})
</script>

<template>
  <div class="mx-auto">
    <RouterView />
  </div>
</template>

<style scoped>
div {
  background: url('@/assets/background.jpeg');
  background-size: cover;
  background-size: 70% 40%;
  background-repeat: repeat;
  min-height: 100vh;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.1);
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
