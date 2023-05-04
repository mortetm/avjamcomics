<template>
  <div class="page">
    <div class="home">
      <ComicContent :comicContent="currentComicContent"></ComicContent>
      <ComicControls
        :prev="prevComic"
        :next="nextComic"
        :isLast="isLast"
        :isFirst="isFirst"
      ></ComicControls>
    </div>
    <LinkBoxes></LinkBoxes>
  </div>
</template>

<script setup>
// @ is an alias to /src
import ComicContent from "@/components/ComicContent.vue";
import ComicControls from "@/components/ComicControls.vue";
import LinkBoxes from "@/components/LinkBoxes.vue";
import { useComicContent } from "@/composables/comicContent";

const comicContent = useComicContent();

const currentComicContent = comicContent[comicContent.length - 1],
  prevComic = (+currentComicContent.id - 1).toString().padStart(3, "0");

let isFirst = false,
  isLast = true;

if (prevComic === "000") {
  isFirst = true;
}
</script>

<style scoped>
.page {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
