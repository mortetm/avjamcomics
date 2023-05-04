<template>
  <h1>
    <button @click="isStrip = !isStrip">🚩 isStrip</button>
    {{ props.comicContent.id }} - {{ props.comicContent.name }}
  </h1>

  <article v-if="isStrip === true">
    <img class="comic-strip" :src="props.comicContent.image" />
  </article>

  <article v-else>
    <img
      v-for="img in props.comicContent.slides"
      class="comic-strip"
      :src="img"
      :key="img"
    />
  </article>

  <div v-if="isStrip === false">
    <img class="swipe-to-read" src="../assets/temp-assets/swipe.jpg" />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  comicContent: Object,
});

// TODO: isStrip should be a global variable
// so that it memorizes
// even better write it in the local storage
const isStrip = ref(true);
</script>

<style scoped>
.comic-strip {
  max-width: 100%;
}

.swipe-to-read {
  max-width: 250px;
}

h1 {
  text-align: left;
  padding-left: 3%;
}
</style>
