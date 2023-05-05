<template>
  <header>
    <h1>{{ props.comicContent.id }} - {{ props.comicContent.name }}</h1>
    <SocialLinks></SocialLinks>
  </header>

  <article v-if="isStrip === true">
    <img class="comic-strip" :src="props.comicContent.image" />
  </article>

  <article v-else>
    <carousel :items-to-show="1">
      <slide v-for="img in props.comicContent.slides" :key="img">
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
</style>
