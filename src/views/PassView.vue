<template>
  <div class="w-full h-[80%] flex flex-col items-center justify-center px-8">
    <input type="text" class="cute-input text-center" placeholder="Nhập pass đê... 🥹" @keyup.enter="submit" @input="error = false">
    <!-- description if wrong pass -->
    <div v-if="error" class="text-[#ff9a8b] text-sm mt-2">
      Pass sai rồi, nhập lại đi 🥹
    </div>
  </div>
</template>

<style>
.cute-input {
    padding: 10px 15px; /* Add space inside the input */
    border: 2px solid #ff9a8b; /* Soft, inviting border color */
    border-radius: 25px; /* Rounded corners for a softer look */
    font-size: 16px;
    color: #333;
    background-color: #fffaf0; /* Light, warm background */
    width: 100%; /* Adjust width as needed */
    box-sizing: border-box; /* Ensures padding/border are included in width calculation */
    transition: all 0.3s ease; /* Smooth transitions for effects */
    outline: none; /* Remove default focus outline */
}

.cute-input::placeholder {
    color: #ff9a8b; /* Match placeholder color to the border */
    opacity: 0.8;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const pass = ref('');
let error = ref(false);

const submit = (e: Event) => {
  if ((e.target as HTMLInputElement).value === '123456') {
    localStorage.setItem('isPassed', 'true');
    localStorage.setItem('expiredAt', (new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toString());
    router.push('/');
  }else {
    pass.value = '';
    error.value = true;
  }
}
</script>