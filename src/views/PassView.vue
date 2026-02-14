<template>
  <div class="w-full h-[80%] flex flex-col items-center justify-center px-8">
    <form @submit.prevent="submit" class="w-full flex flex-col items-center">
      <input
        ref="inputRef"
        v-model="pass"
        type="text"
        class="cute-input text-center"
        :class="{ 'cute-input--error': error }"
        placeholder="Nhập pass đê... 🥹"
        :disabled="isSubmitting"
        autocomplete="off"
        @input="error = false"
      />
      <div v-if="error" class="error-message text-[#ff9a8b] text-sm mt-2">
        Pass sai rồi, nhập lại đi 🥹
      </div>
    </form>
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

.cute-input--error {
    border-color: #ff6b6b;
}

.cute-input:disabled {
    opacity: 0.8;
    cursor: not-allowed;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}

.error-message {
    animation: shake 0.4s ease-in-out;
}
</style>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const pass = ref('');
const error = ref(false);
const isSubmitting = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const VALID_PASS = ['em', 'iu', 'anh'];
const EXPIRY_DAYS = 30;

function isValidPass(value: string): boolean {
  const words = value.trim().split(/\s+/);
  if (words.length !== VALID_PASS.length) return false;
  return VALID_PASS.every((keyword, i) =>
    words[i]?.toLowerCase().includes(keyword)
  );
}

async function submit() {
  const value = pass.value.trim();
  if (!value) return;

  isSubmitting.value = true;
  error.value = false;

  // Brief delay for UX feedback
  await new Promise((r) => setTimeout(r, 150));

  if (isValidPass(value)) {
    const expiryMs = Date.now() + 1000 * 60 * 60 * 24 * EXPIRY_DAYS;
    localStorage.setItem('isPassed', 'true');
    localStorage.setItem('expiredAt', expiryMs.toString());
    await router.push('/');
  } else {
    pass.value = '';
    error.value = true;
    await nextTick();
    inputRef.value?.focus();
  }

  isSubmitting.value = false;
}
</script>