<template>
  <div>
    <input
      id="trigger"
      type="checkbox"
      :checked="store.isColor"
      @click="switchColor"
    />
    <label for="trigger" class="checker"></label>
  </div>
</template>

<script setup>
import { useComicContentStore } from "@/stores/comics";
import { useFavicon } from "@vueuse/core";

/* icon */
const icon = useFavicon();

/* store setup */
const store = useComicContentStore();

function switchColor() {
  store.isColor = !store.isColor;
  localStorage.setItem("comicIsColor", store.isColor);
  if (store.isColor) {
    icon.value = `../favicon-${store.chosenComic}-c.png`;
  } else {
    icon.value = `../favicon-${store.chosenComic}.png`;
  }
}
</script>

<style scoped>
#trigger {
  display: none;
}
.checker {
  background-image: url("../assets/color-switch-v9.png");
  background-position: right center;
  background-size: auto 100%;
  width: 120px;
  height: 20px;
  background-repeat: no-repeat;
  display: block;
}
#trigger:checked + .checker {
  background-position: left center;
}
</style>
