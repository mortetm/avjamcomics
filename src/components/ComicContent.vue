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

  <SingleComicStrip
    v-if="isStrip"
    :comicContent="props.comicContent"
  ></SingleComicStrip>

  <SingleCarousel v-else-if="!isStrip" :comicContent="props.comicContent">
  </SingleCarousel>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
import SocialLinks from "@/components/base/SocialLinks.vue";
import "vue3-carousel/dist/carousel.css";
import ColorSwitcher from "./ColorSwitcher.vue";
import { useComicContentStore } from "@/stores/comics";
import SingleComicStrip from "./base/SingleComicStrip.vue";
import SingleCarousel from "./base/SingleCarousel.vue";

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
  if (window.innerWidth > 768) {
    isStrip.value = true;
  } else {
    isStrip.value = false;
  }
};
</script>

<style scoped>
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
