<template>
  <article>
    <div class="img-wrap" id="img-wrap">
      <img
        v-if="store.isColor && store.chosenComic === 'dl'"
        class="comic-strip"
        id="comic-strip-color"
        :src="store.images.stripColor"
        width="1024"
        height="300"
      />
      <img
        v-else
        class="comic-strip"
        id="comic-strip"
        :src="store.images.strip"
        width="1024"
        height="300"
      />
    </div>
  </article>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";
import { onMounted } from "vue";

/* store setup */
const store = useComicContentStore();
let padding = "";

switch (store.images.panels.length) {
  case 3:
    padding = "36.33%";
    break;
  case 4:
    padding = "27.54%";
    break;
  case 5:
    padding = "22.17%";
    break;
  case 6:
    padding = "18%";
    break;
  default:
    padding = "36.33%";
}

onMounted(() => {
  document.getElementById("img-wrap").style.paddingTop = padding;
});
</script>

<style scoped>
.comic-strip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.img-wrap {
  height: 0;
  overflow: hidden;
  position: relative;
}
</style>
