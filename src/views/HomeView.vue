<template>
  <div autofocus tabindex="0" class="w-full h-full relative py-16 px-4" @click="start" @keydown.enter="start" @keydown.space="start">
    <div v-if="gifInfo?.src" class="flex flex-col items-center justify-center mt-8 min-h-[240px]">
      <div v-show="imageLoading" class="flex flex-col items-center gap-2 text-white/70">
        <svg class="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="25 38" stroke-linecap="round" />
        </svg>
      </div>
      <img
        :src="gifInfo.src"
        alt="hug"
        class="rounded-md mx-auto"
        :class="gifInfo.class"
        @loadstart="imageLoading = true"
        @load="imageLoading = false"
        @error="imageLoading = false"
      >
    </div>
    <div ref="contentRef" id="content" class="text-center px-4 pt-8">
    </div>
    <div class="absolute bottom-8 left-0 right-0 mx-8">
      <StepProgress :current="currentIndex + 1" :total="stack.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import content from '@/assets/content.txt'
import router from '@/router';
import twemoji from 'twemoji';
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

const imageLoading = ref(true)

const start = () => {
  if (currentIndex.value === stack.length) {
    currentIndex.value = 0;
  }
  typewriter = new TypewriterClass('#content', {
    strings: stack[currentIndex.value++],
    loop: false,
    autoStart: true,
    delay: 20,
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

function toTwemojiHtml(text: string): string {
  return twemoji.parse(text, { className: 'emoji-inline', size: '72x72' }) as string;
}

onMounted(async () => {
  const ct = await fetch(content).then(res => res.text());
  stack = ct.split('\n').map(toTwemojiHtml);
  typewriter = new TypewriterClass('#content', {
    strings: stack[0],
    loop: false,
    autoStart: true,
    delay: 20,
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
  width: 100%;
  max-width: 75vw;
  margin: 0 auto;
  text-align: center;
}

.emoji-inline {
  display: inline;
  height: 1.2em;
  width: 1.2em;
  vertical-align: -0.15em;
}
</style>