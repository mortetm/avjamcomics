<template>
  <article>
    <carousel
      :items-to-show="1"
      v-if="store.isColor && store.chosenComic === 'dl'"
    >
      <slide
        v-for="img in props.comicContent.panels_color.split(' ')"
        :key="img"
      >
        <img class="comic-strip" :src="img" />
      </slide>
    </carousel>
    <carousel :items-to-show="1" v-else>
      <slide v-for="img in props.comicContent.panels.split(' ')" :key="img">
        <img class="comic-strip" :src="img" />
      </slide>
    </carousel>

    <div>
      <img class="swipe-to-read" src="@/assets/temp-assets/swipe.jpg" />
    </div>
  </article>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";
import { useComicContentStore } from "@/stores/comics";
import { defineProps } from "vue";

/* store setup */
const store = useComicContentStore();

const props = defineProps({
  comicContent: Object,
});
</script>

<style scoped>
.comic-strip {
  max-width: 100%;
}

.swipe-to-read {
  max-width: 250px;
}
</style>
