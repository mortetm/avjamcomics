<template>
  <article>
    <img
      v-if="store.isColor && store.chosenComic === 'dl'"
      class="comic-strip"
      :src="store.images.stripColor"
    />
    <img v-else class="comic-strip" :src="store.images.strip" />
  </article>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";

/* store setup */
const store = useComicContentStore();
</script>

<style scoped>
.comic-strip {
  max-width: 100%;
}
</style>
