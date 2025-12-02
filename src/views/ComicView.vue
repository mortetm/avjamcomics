<template>
  <div class="page" v-if="store.filteredComics.length > 0">
    <MainMenu :lastComic="store.latestComicPostID"></MainMenu>
    <div class="home" v-if="currentComic">
      <ComicContent :comicContent="currentComic"></ComicContent>
      <ComicControls
        :prev="(+comicID - 1).toString().padStart(4, '0')"
        :next="(+comicID + 1).toString().padStart(4, '0')"
        :isLast="
          comicID === store.filteredComics.length.toString().padStart(4, '0')
        "
        :isFirst="comicID === '0001'"
        :lastComic="store.latestComicPostID"
      ></ComicControls>
    </div>
    <div v-else class="loading">
      <p>Loading comic...</p>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ComicControls from "@/components/ComicControls.vue";
import MainMenu from "@/components/MainMenu.vue";
import { useComicContentStore } from "@/stores/comics";
import ComicContent from "@/components/ComicContent.vue";
import { useFavicon } from "@vueuse/core";

const store = useComicContentStore();
const route = useRoute();
const router = useRouter();
const icon = useFavicon();

// Get comic category from route
const chosenComic = computed(() => route.params.comic);

// Get current comic ID
const comicID = computed(() => {
  if (route.params.id && route.params.id !== "latest") {
    return route.params.id;
  }
  return store.latestComicPostID;
});

// Get current comic object
const currentComic = computed(() => {
  if (!comicID.value) return null;
  return store.filteredComics.find((comic) => comic.id === comicID.value);
});

// Initialize comics for this category
const initializeComic = async () => {
  // Make sure we have the right category filtered
  if (chosenComic.value) {
    await store.filterComics(chosenComic.value);
  }

  // Wait for comics to load if needed
  if (store.filteredComics.length === 0) {
    console.log("Waiting for comics to load...");
    return;
  }

  // If route says "latest" but we have a latestComicPostID, redirect to actual ID
  if (route.params.id === "latest" && store.latestComicPostID) {
    router.replace(`/${chosenComic.value}/${store.latestComicPostID}`);
    return;
  }

  // Generate images for current comic
  if (comicID.value) {
    console.log("Loading comic:", comicID.value);
    store.generateImages(comicID.value);

    // Set favicon
    icon.value = `/favicon-${chosenComic.value}.png`;
  } else {
    console.error("No comic ID available");
  }
};

// Initialize on mount
onMounted(() => {
  initializeComic();
});

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    initializeComic();
  }
);

// Watch for comic category changes
watch(
  () => route.params.comic,
  () => {
    initializeComic();
  }
);

// Watch for when comics finish loading
watch(
  () => store.latestComicPostID,
  (newVal) => {
    if (newVal && !route.params.id) {
      initializeComic();
    }
  }
);
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #666;
}
</style>
