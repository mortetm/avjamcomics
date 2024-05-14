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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ComicControls from "@/components/ComicControls.vue";
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
icon.value = `../../favicon-${chosenComic.value}.png`;

/* keyboard nav */
// const isLast =
//   comicID.value === store.filteredComics.length.toString().padStart(4, "0")
//     ? true
//     : false;
// const isFirst = comicID.value === "0001" ? true : false;
// const prev = (+comicID.value - 1).toString().padStart(4, "0");
// const next = (+comicID.value + 1).toString().padStart(4, "0");

// document.addEventListener("keydown", function (event) {
//   if (event.key === "ArrowLeft" && !isFirst) {
//     router.push(`/${chosenComic.value}/comic/${prev}`);
//   }
//   if (event.key === "ArrowRight" && !isLast) {
//     router.push(`/${chosenComic.value}/comic/${next}`);
//   }
// });
/* width */
</script>
