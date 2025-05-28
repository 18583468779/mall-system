<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  src: string;
  alt?: string;
}>();

const imgRef = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && imgRef.value) {
        imgRef.value.src = props.src;
        isLoaded.value = true;
        observer.unobserve(entry.target);
      }
    });
  });

  if (imgRef.value) {
    observer.observe(imgRef.value);
  }
});
</script>

<template>
  <div class="lazy-image">
    <img
      ref="imgRef"
      :data-src="src"
      :alt="alt"
      class="transition-opacity duration-300 w-full"
      :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
    />
    <div v-if="!isLoaded" class="skeleton"></div>
  </div>
</template>
