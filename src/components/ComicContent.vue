<template>
  <header v-if="props.comicContent">
    <h1>
      {{ props.comicContent.id }} -
      {{ props.comicContent.title }}
    </h1>
    <div class="header-right">
      <ColorSwitcher v-if="store.chosenComic === 'dl'"></ColorSwitcher>
      <SocialLinks></SocialLinks>
    </div>
  </header>

  <SingleComicStrip
    v-if="isStrip && props.comicContent"
    :comicContent="props.comicContent"
  ></SingleComicStrip>

  <SingleCarousel
    v-else-if="!isStrip && props.comicContent"
    :comicContent="props.comicContent"
  >
  </SingleCarousel>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted, computed } from "vue";
import SocialLinks from "@/components/base/SocialLinks.vue";
import "vue3-carousel/dist/carousel.css";
import ColorSwitcher from "./ColorSwitcher.vue";
import { useComicContentStore } from "@/stores/comics";
import SingleComicStrip from "./base/SingleComicStrip.vue";
import SingleCarousel from "./base/SingleCarousel.vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "unhead";

const route = useRoute();
const router = useRouter();
const store = useComicContentStore();

const props = defineProps({
  comicContent: {
    type: Object,
    required: false,
    default: null,
  },
});

const isStrip = ref(true);

// Safely get comic family
const comicFamily = computed(() => {
  if (!store.chosenComic) return null;

  return store.comicFamily.find((comic) => comic.code === store.chosenComic);
});

// Safely get comic ID
const comicID = computed(() => route.params.id);

// Computed head config - only returns data when everything is ready
const headConfig = computed(() => {
  if (!props.comicContent || !comicFamily.value) {
    return {
      title: "AvJam Comics",
      meta: [],
    };
  }

  return {
    title: `${props.comicContent.title} | ${comicFamily.value.name}`,
    meta: [
      {
        property: "og:title",
        content: `${props.comicContent.title} | ${comicFamily.value.name}`,
      },
      {
        property: "og:image",
        content: store.images.share || store.images.ogshare,
      },
    ],
  };
});

// Apply head config
useHead(headConfig);

onMounted(() => {
  // Only redirect if we have valid data
  if (
    comicID.value &&
    store.latestComicPostID &&
    comicID.value === store.latestComicPostID
  ) {
    router.push({ path: `/${store.chosenComic}/latest` });
  }

  resizeHandler();
  window.addEventListener("resize", resizeHandler);

  // Set background color
  if (store.comicColor && store.isColor) {
    document.body.style.backgroundColor = store.comicColor;
  } else {
    document.body.style.backgroundColor = "#ffffff";
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});

const resizeHandler = () => {
  if (window.innerWidth > 768) {
    isStrip.value = true;
  } else {
    isStrip.value = false;
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
  padding-left: 3%;
  display: inline-block;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 97%;
}
.header-right {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>
