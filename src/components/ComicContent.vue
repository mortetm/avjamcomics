<template>
  <header>
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
    v-if="isStrip"
    :comicContent="props.comicContent"
  ></SingleComicStrip>

  <SingleCarousel v-else-if="!isStrip" :comicContent="props.comicContent">
  </SingleCarousel>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
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
const comicID = ref(route.params.id);

const props = defineProps({
  comicContent: Object,
});
const isStrip = ref(true);

/* store setup */
const store = useComicContentStore();

/* head: set title & meta for facebook sharing*/
const comicFamily = store.comicFamily.find(
  (comic) => comic.code === store.chosenComic
);
useHead({
  title: `${props.comicContent.title} | ${comicFamily.name}`,
  meta: [
    {
      property: "og:title",
      content: `${props.comicContent.title} | ${comicFamily.name}`,
    },
    {
      property: "og:image",
      content: store.images.share,
    },
  ],
});

onMounted(() => {
  // move the user to /latest so that it is
  // highlighted in the menu if it's the latest comic
  if (comicID.value === store.latestComicPostID) {
    router.push({ path: `/${store.chosenComic}/latest` });
  }
  resizeHandler();
  window.addEventListener("resize", resizeHandler);

  if (store.comicColor && store.isColor) {
    console.log(store.comicColor);
    document.body.style.backgroundColor = `${store.comicColor}`;
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
