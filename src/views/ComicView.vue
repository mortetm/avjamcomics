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
import { useRoute } from "vue-router";
import ComicContent from "@/components/ComicContent.vue";
import ComicControls from "@/components/ComicControls.vue";
import LinkBoxes from "@/components/LinkBoxes.vue";
import { useComicContent } from "@/composables/comicContent";
import router from "@/router";

const route = useRoute(),
  comicID = route.params.id,
  nextComic = (+comicID + 1).toString().padStart(3, "0"),
  prevComic = (+comicID - 1).toString().padStart(3, "0");

let isLast = false,
  isFirst = false;

if (prevComic === "000") {
  isFirst = true;
}

const comicContent = useComicContent();
const currentComicContent = comicContent.find((comic) => comic.id === comicID);

if (nextComic === (+comicContent.length + 1).toString().padStart(3, "0")) {
  isLast = true;
  router.push({ path: "/" });
}
</script>

<style scoped>
.page {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
