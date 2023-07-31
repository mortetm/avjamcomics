<template>
  <article>
    <carousel
      :items-to-show="1"
      v-if="store.isColor && store.chosenComic === 'dl'"
    >
      <slide v-for="img in store.images.panelsColor" v-bind:key="img">
        <img class="comic-strip" :src="img" />
      </slide>
    </carousel>
    <carousel :items-to-show="1" v-else>
      <slide v-for="img in store.images.panels" v-bind:key="img">
        <img class="comic-strip" :src="img" />
      </slide>
    </carousel>

    <div class="swipe-to-read">
      <img src="@/assets/temp-assets/arrow-l.png" />
      <span>SWIPE TO READ</span>
      <img src="@/assets/temp-assets/arrow-r.png" />
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
  width: 100%;
}

.img-wrap {
  height: 0;
  overflow: hidden;
  padding-top: 50%;
}

.swipe-to-read {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.swipe-to-read img {
  max-height: 30px;
}
.swipe-to-read span {
  font-size: 20px;
  padding: 0 10px;
}
</style>
