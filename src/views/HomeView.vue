<template>
  <div class="w-full h-full relative py-16 px-4" @click="start" @keydown.enter="start" @keydown.space="start">
    <div ref="contentRef" id="content" class="text-center px-4">
    </div>
    <img v-if="gifInfo?.src" :src="gifInfo.src" alt="hug" class="rounded-md mx-auto mt-8" :class="gifInfo.class" loading="lazy">
  </div>
</template>

<script setup lang="ts">
import content from '@/assets/content.txt'
import router from '@/router';
import TypewriterClass from 'typewriter-effect/dist/core';
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { GIFS } from '@/constants';

let typewriter: TypewriterClass | null = null;
let stack: string[] = [];
let typeStack = []
let contentRef = ref<HTMLDivElement | null>(null);
const currentIndex = ref(0);

const gifInfo = computed(() => {
  const gif = GIFS[currentIndex.value];
  return gif
})

const start = () => {
  if (currentIndex.value === stack.length) {
    currentIndex.value = 0;
  }
  typewriter = new TypewriterClass('#content', {
    strings: stack[currentIndex.value++],
    loop: false,
    autoStart: true,
    delay: 10,
    deleteSpeed: 10
  });
  typewriter?.start();
}

onBeforeMount(() => {
  const isPassed = localStorage.getItem('isPassed');
  if (!isPassed) {
    router.push('/pass');
  }
})

onMounted(async () => {
  const ct = await fetch(content).then(res => res.text());
  stack = ct.split('\n');
  typewriter = new TypewriterClass('#content', {
    strings: stack[0],
    loop: false,
    autoStart: true,
    delay: 10,
    deleteSpeed: 10
  });
  currentIndex.value++;
  typewriter?.start();
})
</script>

<style>
*{
  font-weight: 800;
  font-size: 1.25rem;
}

#content{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  top: 43%;
  z-index: 10;
}
</style>