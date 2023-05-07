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
  console.log("on CV mounted");
  console.log("latestComic value data", latestComic.value);
  console.log("store", store.comics);
  isLoading = store.loading;
  console.log(isLoading);
});
/* route */
const route = useRoute();
let comicID = route.params.id;

/* set useComicContent */

// const { comicContentOLD, latestComic } = useComicContent();
/* if route id = undefined, default to last comic */
// let latestComic = null;
if (!comicID) {
  comicID = latestComic;
}

const nextComic = (+comicID + 1).toString().padStart(4, "0"),
  prevComic = (+comicID - 1).toString().padStart(4, "0");
// const currentComicContent = comicContent.value.find(
//   (comic) => comic.id === comicID
// );
/* comic */

let isLast = false,
  isFirst = false;

if (prevComic === "0000") {
  isFirst = true;
}

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
