<template>
  <MainMenu></MainMenu>

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
import { useRoute } from "vue-router";
import { useComicContent } from "@/composables/comicContent";
import ComicContent from "@/components/ComicContent.vue";
import ComicControls from "@/components/ComicControls.vue";
import LinkBoxes from "@/components/LinkBoxes.vue";
import router from "@/router";
import MainMenu from "@/components/MainMenu.vue";

/* route */
const route = useRoute();
let comicID = route.params.id;

/* set useComicContent */

const { comicContent, latestComic } = useComicContent();

/* if route id = undefined, default to last comic */
if (!comicID) {
  comicID = latestComic;
}

const nextComic = (+comicID + 1).toString().padStart(4, "0"),
  prevComic = (+comicID - 1).toString().padStart(4, "0");
const currentComicContent = comicContent.find((comic) => comic.id === comicID);
/* comic */

let isLast = false,
  isFirst = false;

if (prevComic === "0000") {
  isFirst = true;
}

if (currentComicContent.id === latestComic) {
  isLast = true;
  router.push({ path: "/latest" });
}

/* width */
</script>

<style scoped>
.page {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
