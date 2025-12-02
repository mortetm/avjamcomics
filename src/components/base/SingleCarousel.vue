<template>
  <article>
    <carousel
      :items-to-show="1"
      :wrap-around="false"
      :transition="500"
      v-model="currentSlide"
      ref="carouselRef"
    >
      <slide
        v-for="(img, index) in store.images.panels"
        :key="`slide-${store.currentComicID}-${index}`"
      >
        <div class="slide-wrapper">
          <div class="image-stack">
            <!-- B&W image (always rendered) -->
            <img
              class="comic-strip stack-base"
              :src="store.images.panels[index]"
              :alt="`Comic panel ${index + 1} - Black and White`"
              crossorigin="anonymous"
              @error="handleImageError($event, index, 'bw')"
            />
            <!-- Color image (always rendered if exists, controlled by CSS) -->
            <img
              v-show="store.images.panelsColor[index]"
              class="comic-strip stack-overlay"
              :class="{
                'show-color': store.isColor && store.images.panelsColor[index],
              }"
              :src="store.images.panelsColor[index] || ''"
              :alt="`Comic panel ${index + 1} - Color`"
              crossorigin="anonymous"
              @error="handleImageError($event, index, 'color')"
            />
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>

    <div
      class="swipe-to-read"
      v-if="currentSlide === 0 && store.images.panels.length > 1"
    >
      <img src="@/assets/temp-assets/arrow-l.png" alt="Swipe left" />
      <span>SWIPE TO READ</span>
      <img src="@/assets/temp-assets/arrow-r.png" alt="Swipe right" />
    </div>
  </article>
</template>

<script setup>
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useComicContentStore } from "@/stores/comics";
import { ref, reactive, onMounted, watch, nextTick } from "vue";

const store = useComicContentStore();
const currentSlide = ref(0);
const imageErrors = reactive({});
const carouselRef = ref(null);
const imagesLoaded = ref(false);

// Preload current comic
const preloadImages = async () => {
  const imagesToPreload = [
    ...store.images.panels,
    ...store.images.panelsColor.filter(Boolean),
  ];

  const loadPromises = imagesToPreload.map((src) => {
    return new Promise((resolve) => {
      if (!src) {
        resolve();
        return;
      }

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
  imagesLoaded.value = true;
};

onMounted(async () => {
  if (store.images.panels.length > 0) {
    await preloadImages();
  }
});

watch(
  () => store.currentComicID,
  async () => {
    imagesLoaded.value = false;
    await nextTick();
    await preloadImages();
  },
  { immediate: false }
);

const handleImageError = (event, index, type) => {
  console.error(
    `Panel ${index + 1} (${type}) failed to load:`,
    event.target.src
  );
  imageErrors[index] = true;
};
</script>

<style scoped>
.comic-strip {
  width: 100%;
  height: auto;
  display: block;
  max-height: 80vh;
  object-fit: contain;
  /* Force GPU acceleration and prevent flicker */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.slide-wrapper {
  position: relative;
  width: 100%;
  min-height: 400px;
}

.image-stack {
  position: relative;
  width: 100%;
  /* Prevent layout shift */
  contain: layout;
}

.stack-base {
  position: relative;
  display: block;
}

.stack-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  pointer-events: none;
  /* Performance optimizations */
  will-change: opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.stack-overlay.show-color {
  opacity: 1;
}

.swipe-to-read {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.swipe-to-read img {
  max-height: 30px;
  width: auto;
}

.swipe-to-read span {
  font-size: 20px;
  padding: 0 10px;
  font-weight: 600;
  color: #333;
}

/* Carousel customization */
:deep(.carousel__slide) {
  padding: 10px;
}

:deep(.carousel__pagination) {
  margin-top: 10px;
}

:deep(.carousel__pagination-button::after) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  transition: background-color 0.3s ease;
}

:deep(.carousel__pagination-button--active::after) {
  background-color: v-bind('store.comicColor || "#007bff"');
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

:deep(.carousel__prev):hover,
:deep(.carousel__next):hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
