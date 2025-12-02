<template>
  <article>
    <div class="img-wrap">
      <div class="image-stack">
        <img
          v-show="store.images.strip"
          class="comic-strip stack-base"
          :src="store.images.strip || ''"
          :alt="`Comic strip with ${panelCount} panels - Black and White`"
          crossorigin="anonymous"
          @error="handleImageError('bw')"
        />
        <img
          v-show="store.images.stripColor"
          class="comic-strip stack-overlay"
          :class="{ 'show-color': store.isColor && store.images.stripColor }"
          :src="store.images.stripColor || ''"
          :alt="`Comic strip with ${panelCount} panels - Color`"
          crossorigin="anonymous"
          @error="handleImageError('color')"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";
import { computed, onMounted, watch, nextTick } from "vue";

const store = useComicContentStore();

const ASPECT_RATIOS = {
  3: "1024 / 372",
  4: "1024 / 282",
  5: "1024 / 697",
  6: "1024 / 697",
  default: "1024 / 372",
};

const panelCount = computed(() => {
  return store.images?.panels?.length || 0;
});

const aspectRatio = computed(() => {
  return ASPECT_RATIOS[panelCount.value] || ASPECT_RATIOS.default;
});

// Preload current comic images
const preloadImages = async () => {
  const imagesToPreload = [store.images.strip, store.images.stripColor].filter(
    Boolean
  );

  const loadPromises = imagesToPreload.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      if (img.complete) {
        resolve();
        return;
      }

      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  });

  await Promise.all(loadPromises);
};

onMounted(async () => {
  if (store.images.strip || store.images.stripColor) {
    await preloadImages();
  }
});

watch(
  () => [store.images.strip, store.images.stripColor],
  async () => {
    await nextTick();
    await preloadImages();
  },
  { deep: true }
);

const handleImageError = (type) => {
  console.error(`Strip image (${type}) failed to load`);
};
</script>

<style scoped>
.img-wrap {
  width: 100%;
  aspect-ratio: v-bind(aspectRatio);
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;
  contain: layout;
}

.image-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.comic-strip {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.stack-base {
  position: relative;
}

.stack-overlay {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  pointer-events: none;
  will-change: opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.stack-overlay.show-color {
  opacity: 1;
}
</style>
