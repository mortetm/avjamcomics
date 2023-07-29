<template>
  <article>
    <carousel
      :items-to-show="1"
      v-if="store.isColor && store.chosenComic === 'dl'"
    >
      <slide v-for="img in store.images.panelsColor" v-bind:key="img">
        <div class="img-wrap">
          <img class="comic-strip" :src="img" />
        </div>
      </slide>
    </carousel>
    <carousel :items-to-show="1" v-else>
      <slide v-for="img in store.images.panels" v-bind:key="img">
        <div class="img-wrap">
          <img class="comic-strip" :src="img" />
        </div>
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

/* store setup */
const store = useComicContentStore();
</script>

<style scoped>
.comic-strip {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
}

.img-wrap {
  height: 0;
  overflow: hidden;
  padding-top: 50%;
}

.swipe-to-read {
  max-width: 250px;
}
</style>
