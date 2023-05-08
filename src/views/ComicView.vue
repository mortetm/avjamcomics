<!--
// import { useComicContent } from "@/composables/comicContent";
// import ComicContent from "@/components/ComicContent.vue";
// import router from "@/router";
-->
<template>
  <MainMenu></MainMenu>

  <div class="page" v-if="!isLoading">
    test
    <div class="home">
      <!-- <ComicContent :comicContent="currentComicContent"></ComicContent> -->
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
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ComicControls from "@/components/ComicControls.vue";
import LinkBoxes from "@/components/LinkBoxes.vue";
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";

let isLoading = ref(null);

/* store setup */
const store = useComicContentStore();

let latestComic = computed(() => {
  return store.getLatestComic;
});

onMounted(() => {
  isLoading = store.loading;
});
/* route */
const route = useRoute();
let comicID = route.params.id;

/* set useComicContent */

/* if route id = undefined, default to last comic */
if (!comicID) {
  comicID = latestComic.value;
}

console.log(store.comics);
const nextComic = (+comicID + 1).toString().padStart(4, "0"),
  prevComic = (+comicID - 1).toString().padStart(4, "0");
const currentComicContent = store.comics.find((comic) => comic.id === comicID);
/* comic */

let isLast = false,
  isFirst = false;

if (prevComic === "0000") {
  isFirst = true;
}

console.log("IN THE WILD", store.comics);
console.log(currentComicContent);

// if (currentComicContent.id === latestComic) {
//   isLast = true;
//   router.push({ path: "/latest" });
// }

/* width */
</script>

<style scoped>
.page {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
