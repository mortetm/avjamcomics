<template>
  <header>
    <h1>
      {{ props.comicContent.post_id }} -
      {{ props.comicContent.title.rendered }}
    </h1>
    <div class="header-right">
      <ColorSwitcher v-if="store.chosenComic === 'dlc'"></ColorSwitcher>
      <SocialLinks></SocialLinks>
    </div>
  </header>
  <article v-if="isStrip">
    <img class="comic-strip" :src="props.comicContent.strip_image" />
  </article>

  <article v-else-if="!isStrip">
    <carousel :items-to-show="1">
      <slide v-for="img in props.comicContent.panels.split(' ')" :key="img">
        <img class="comic-strip" :src="img" />
      </slide>
    </carousel>
  </article>

  <div v-if="isStrip === false">
    <img class="swipe-to-read" src="../assets/temp-assets/swipe.jpg" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
import SocialLinks from "@/components/SocialLinks.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import ColorSwitcher from "./ColorSwitcher.vue";
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();

const props = defineProps({
  comicContent: Object,
});

const isStrip = ref(true);

onMounted(() => {
  resizeHandler();
  window.addEventListener("resize", resizeHandler);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});

const resizeHandler = () => {
  console.log(props);
  if (window.innerWidth > 768) {
    isStrip.value = true;
  } else {
    isStrip.value = false;
  }
};
</script>

<style scoped>
.comic-strip {
  max-width: 100%;
}

.swipe-to-read {
  max-width: 250px;
}

h1 {
  text-align: left;
  padding-left: 3%;
  display: inline-block;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 97%;
}
.header-right {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>
