<template>
  <div class="page" v-if="store.filteredComics.length > 0">
    <MainMenu :lastComic="store.latestComicPostID"></MainMenu>
    <div class="home">
      <ComicContent
        :comicContent="
          store.filteredComics.find((comic) => comic.id === comicID)
        "
      ></ComicContent>
      <ComicControls
        :prev="(+comicID - 1).toString().padStart(4, '0')"
        :next="(+comicID + 1).toString().padStart(4, '0')"
        :isLast="
          comicID === store.filteredComics.length.toString().padStart(4, '0')
            ? true
            : false
        "
        :isFirst="comicID === '0001' ? true : false"
        :lastComic="store.latestComicPostID"
      ></ComicControls>
    </div>
    <LinkBoxes></LinkBoxes>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ComicControls from "@/components/ComicControls.vue";
import LinkBoxes from "@/components/LinkBoxes.vue";
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";
import ComicContent from "@/components/ComicContent.vue";
import { useFavicon } from "@vueuse/core";

/* store setup */
const store = useComicContentStore();

/* route */
const route = useRoute();

/* get current comicID */
let comicID = ref(route.params.id);
let chosenComic = ref(route.params.comic);

store.filterComics(chosenComic.value);

if (!route.params.id) {
  comicID = store.latestComicPostID;
}

if (route.params.id) {
  store.generateImages(comicID.value);
} else if (!route.params.id) {
  store.generateImages(comicID);
}

/* favicon */
// set favicon depending on current comic family
const icon = useFavicon();
icon.value = `../favicon-${chosenComic.value}.png`;

/* width */
</script>
