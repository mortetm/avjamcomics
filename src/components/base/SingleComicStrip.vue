<template>
  <article>
    <img
      v-if="store.isColor && store.chosenComic === 'dl'"
      class="comic-strip"
      :src="props.comicContent.strip_image_color"
    />
    <img v-else class="comic-strip" :src="props.comicContent.strip_image" />
  </article>
</template>

<script setup>
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
</style>
